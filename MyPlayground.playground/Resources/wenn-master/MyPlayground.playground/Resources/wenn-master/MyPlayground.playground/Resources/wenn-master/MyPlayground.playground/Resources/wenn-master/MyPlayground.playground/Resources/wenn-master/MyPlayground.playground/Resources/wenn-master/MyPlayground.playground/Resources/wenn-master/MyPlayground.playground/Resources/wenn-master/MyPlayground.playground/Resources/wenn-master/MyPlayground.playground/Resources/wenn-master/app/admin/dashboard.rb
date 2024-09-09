ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Recently Created Companies" do
          ul do
            Company.order(created_at: :desc).last(5).map do |company|
              li link_to(company.name, admin_company_path(company))
            end
          end
        end
      end

      column do
        panel "Recently Updated Companies" do
          ul do
            Company.order(updated_at: :desc).last(5).map do |company|
              li link_to(company.name, admin_company_path(company))
            end
          end
        end
      end
    end

    columns do
      column do
        panel "Recently Published Companies" do
          ul do
            companies = Company.published.order(published_at: :desc).last(5)
            companies.any? ?
              companies.map do |company|
                li link_to(company.name, admin_company_path(company))
              end : "No recently published companies found"
          end
        end
      end


      column do
        panel "Recently Published Job Descriptions" do
          ul do
            job_descriptions = JobDescription.published.order(published_at: :desc).last(5)
            job_descriptions.any? ?
              job_descriptions.map do |job_description|
                li link_to(job_description.title, admin_job_description_path(job_description))
              end : "No recently published job descriptions found"
          end
        end
      end
    end
  end
end
