module MailerHelper
  def build_url(path = '')
    "#{ActionMailer::Base::default_url_options[:protocol]}://#{ActionMailer::Base::default_url_options[:host]}:#{ActionMailer::Base::default_url_options[:port]}/#{path}"
  end
end
