ActiveAdmin.register Company do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  COMPANY_BASE_PARAMS = [:name,
    :description_markdown,
    :what_makes_us_special_markdown,
    :website_url,
    :career_site_url,
    :size,
    :founded_at,
    :headquarters_location,
    :industry_tags,
    :glassdoor_overall_score,
    :glassdoor_review_count,
    :glassdoor_url,
    :twitter_username,
    :facebook_username,
    :instagram_username,
    :tiktok_username,
    :youtube_username,
    :youtube_cover_video_url,
    :youtube_video_url_1,
    :youtube_video_url_2,
    :youtube_video_url_3,
    :youtube_video_url_4,
    :linkedin_username,
  ].freeze

  permit_params COMPANY_BASE_PARAMS + [
    :marked_complete,
    :published,
    :logomark,
    :primary_cover_photo,
    :secondary_cover_photo,
    :remove_logomark,
    :remove_primary_cover_photo,
    :remove_secondary_cover_photo,
    default_benefits_profile_attributes: [:id] +
      BenefitsProfile::BOOLEAN_COLUMNS,
    content_gallery_items_attributes: Admin::ContentGalleryHelper::ATTRIBUTES
  ]

  scope :completed
  scope :published

  filter :created_at
  filter :updated_at
  filter :name
  filter :marked_complete_at
  filter :published_at
  filter :what_makes_us_special_markdown
  filter :description_markdown
  filter :website_url
  filter :career_site_url
  filter :size
  filter :founded_at
  filter :headquarters_location
  filter :industry_tags
  filter :glassdoor_overall_score
  filter :glassdoor_review_count
  filter :glassdoor_url
  filter :twitter_username
  filter :facebook_username
  filter :instagram_username
  filter :tiktok_username
  
  index do
    selectable_column
    id_column
    column :name
    column :created_at
    column :updated_at
    actions
  end

  show do
    attributes_table do
      attributes = COMPANY_BASE_PARAMS.dup
      attributes.insert(1, :default_benefits_profile_id)
      attributes.insert(0, :marked_complete_at)
      attributes.insert(1, :published_at)
      attributes.unshift(:updated_at)
      attributes.unshift(:created_at)

      attributes.each do |param|
        if param.to_s.match?(/_url(_\d)?$/) && resource.send(param).present?
          row param do
            link_to resource.send(param), resource.send(param), target: :blank
          end
        elsif param.to_s.ends_with?("_id") && resource.respond_to?(
          association_name = param.to_s.gsub(/_id$/, '')
        )
          row association_name
      elsif param.to_s.ends_with?("_markdown")
        instance_exec(param, &Admin::MarkdownHelper.render_markdown)
      else
        row param
      end
      end
      row :logomark do
        self.instance_exec(:logomark, resource, &Admin::ImageHelper.render_image)
      end
      row :primary_cover_photo do
        self.instance_exec(:primary_cover_photo, resource, &Admin::ImageHelper.render_image)
      end
      row :secondary_cover_photo do
        self.instance_exec(:secondary_cover_photo, resource, &Admin::ImageHelper.render_image)
      end
      row :social_media_posts do
        count = resource.social_media_posts.count
        link_to_if(
          count > 0,
          "#{count} social media #{'post'.pluralize(count)}",
          admin_social_media_posts_path(q: { company_id_eq: resource.id })
        )
      end
    end
    self.instance_exec(&Admin::ContentGalleryHelper.render_content_gallery_panel)
    panel "Data sync status" do
      attributes_table_for resource do
        row(:glassdoor_api) do
          attributes_table_for resource do
            row(:last_run_at)  { nil }
            row(:last_run_result)  { nil }
            row(:next_run_status) { nil }
            row(:next_run_at)  { nil }
          end
        end
        row(:twitter_scraper) do
          attributes_table_for resource do
            scheduler = DataSync::Scheduler.new(resource, :twitter)
            results = scheduler.previous_job_results
            results = nil if !results.any? || results[:status] != 'complete'
            # todo: dont retrieve job live; rather, have the scheduled
            # time in the sidekiq::status object
            job = scheduler.job
            row(:last_run_at)  { results ? Time.at(results['update_time'].to_i) : nil }
            row(:last_run_result)  do
              begin
                results ? DataSync::ResultsRenderer.new(results).render(self) : nil
              rescue => ex
                Rails.logger.error("Failed to render results: #{ex.message}")
                Sentry.capture_exception(ex)
                nil
              end
            end
            row(:next_run_status)  { scheduler.job_status }
            row(:next_run_at)  { job ? Time.at(job.score) : nil }
          end
        end
        row(:we_work_remotely_scraper) do
          attributes_table_for resource do
            row(:last_run_at)  { nil }
            row(:last_run_result)  { nil }
            row(:next_run_status) { nil }
            row(:next_run_at)  { nil }
          end
        end
      end
    end
    active_admin_comments
  end

  form html: { multipart: true } do |f|
    f.semantic_errors
    columns = f.form_builder.send :default_columns_for_object
    columns -= [:marked_complete_at, :published_at, "default_benefits_profile"]
    f.inputs do
      columns.each_with_index do |column, index|
        # insert virtual columns
        if index == 0
          f.input :marked_complete, as: :boolean
          f.input :published, as: :boolean
        end

        col = object.class.column_for_attribute(column)
        if col.respond_to?(:array?) && col.array?
          f.input column, as: :array
        elsif column == :founded_at
          f.input column, as: :date_picker
        elsif column.to_s.end_with?("_at")
          f.input column, as: :datetime_picker
        elsif column.to_s.ends_with?("_markdown")
          f.input column, as: :markdown
        else
          f.input column
        end
      end
      f.input :logomark, as: :image_file
      f.input :primary_cover_photo, as: :image_file
      f.input :secondary_cover_photo, as: :image_file
      benefits_profile_name = object.default_benefits_profile.name
      benefits_profile_name += " (Id #{object.default_benefits_profile.id})" if object.default_benefits_profile.id
      f.has_many :default_benefits_profile, heading: "Benefits Profile: #{benefits_profile_name}", allow_destroy: false, new_record: false do |f|
        instance_exec(f, &Admin::BenefitsProfileHelper.render_benefits_form)
      end
      instance_exec(f, &Admin::ContentGalleryHelper.render_content_gallery_form)
    end
    f.actions
  end

  csv do |company|
    column('id (leave blank for new record)') { |company| company.id }
    export_only_columns = [:created_at, :updated_at, :marked_complete_at, :published_at]
    array_columns = [:industry_tags]

    @resource.content_columns.each do |c|
      # virtual columns
      column :marked_complete if c == :marked_complete_at
      column :published if c == :published_at

      column_header = c.to_s
      column_header += " (export only)" if export_only_columns.include?(c)
      column(column_header, humanize_name: false) do |object|
        value = object.send(c)
        value = value.join(', ') if array_columns.include?(c)
        value
      end
    end

    has_one_image_attachments = [:logomark, :primary_cover_photo, :secondary_cover_photo]
    has_one_image_attachments.each do |attachment_attr|
      column_header = "#{attachment_attr} url (use external url for import)"
      column(column_header, humanize_name: false) do |object|
        attachment = object.send(attachment_attr)
        Rails.application.routes.url_helpers.url_for(attachment) if attachment.attached?
      end
    end

    column('default_benefits_profile_id (export only)') { |company| company.default_benefits_profile_id }
    benefits_profile_columns = BenefitsProfile.content_columns.map(&:name).map(&:to_sym)
    benefits_profile_columns -= [:name, :created_at, :updated_at]
    benefits_profile_columns.each do |c|
      column(c, humanize_name: false) do |company|
        company.default_benefits_profile.send(c)
      end
    end
  end
end
