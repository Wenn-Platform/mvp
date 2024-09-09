module Admin::ContentGalleryHelper
  ATTRIBUTES = [
    :id,
    :_destroy,
    :remove_photo,
    :photo,
    :video_url,
    :title,
    :description,
    :sort_order
  ]
  def self.render_content_gallery_form
    Proc.new do |f|
      f.has_many :content_gallery_items, heading: "Content Gallery", allow_destroy: true, new_record: true do |f|
        f.input :photo, as: :image_file, hint: 'Upload an image OR specify a video URL, but not both'
        f.input :video_url, hint: 'Optional. Set this only if you are not uploading a photo. Supported video players: YouTube'
        f.input :title, hint: 'Optional. This will be shown below the photo when the user taps on it. Only supported for photos'
        f.input :sort_order, hint: 'This will be set automatically. Change only if you need to re-order the Content Gallery'
      end
    end
  end

  def self.render_content_gallery_panel
    Proc.new do
      if resource.content_gallery_items.to_a.any?
        panel "Content Gallery" do
          div style: 'display: flex; flex-wrap: wrap' do
            view = self
            resource.content_gallery_items.map do |content_gallery_item|
              div style: 'width: 200px; min-width: 200px; padding: 20px;' do
                image = self.instance_exec(:photo, content_gallery_item, &Admin::ImageHelper.render_image)
                image ?
                  image + "<br />".html_safe + content_gallery_item.title :
                  div('data-embed-video-url' => content_gallery_item.video_url )
              end
            end
          end
        end
      end
    end
  end
end
