module Admin::BenefitsProfileHelper
  def self.render_benefits_form
    Proc.new do |f|
      I18n.t("benefits_profile.categories").map do |(category, attributes)|
        label_renderer = Proc.new do
          f.label I18n.t("benefits_profile.category_labels.#{category}")
        end


        # handle crazy render redirection in activeadmin has_many
        if f.is_a?(ActiveAdmin::Views::ActiveAdminForm)
          # root form
          li(&label_renderer)
        else
          # has_many
          f.template.concat(f.template.content_tag(:li, &label_renderer).html_safe)
        end

        attributes.map do |attr|
          f.input attr
        end
      end
    end
  end
end
