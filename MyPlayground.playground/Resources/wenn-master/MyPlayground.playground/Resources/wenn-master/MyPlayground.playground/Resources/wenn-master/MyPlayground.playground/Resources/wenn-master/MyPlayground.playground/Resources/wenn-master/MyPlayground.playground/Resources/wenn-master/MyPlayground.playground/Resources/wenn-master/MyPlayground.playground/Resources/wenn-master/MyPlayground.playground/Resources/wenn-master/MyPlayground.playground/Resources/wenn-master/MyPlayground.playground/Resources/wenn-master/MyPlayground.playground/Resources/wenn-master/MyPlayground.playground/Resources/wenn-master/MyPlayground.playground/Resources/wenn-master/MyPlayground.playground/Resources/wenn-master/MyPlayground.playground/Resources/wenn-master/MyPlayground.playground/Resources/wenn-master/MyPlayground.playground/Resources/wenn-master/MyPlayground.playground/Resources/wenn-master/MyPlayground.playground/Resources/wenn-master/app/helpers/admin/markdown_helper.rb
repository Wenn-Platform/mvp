module Admin::MarkdownHelper
  def self.render_markdown()
    Proc.new do |param|
      row param.to_s.remove('_markdown').humanize do
        div class: 'markdown' do
          resource.send(param)
        end
      end
    end
  end
end
