class GlobalSettingsStore
  include Singleton

  CACHE_EXPIRATION_SECONDS = (5 * 60)

  NO_OP = Proc.new { |value| value }
  SPLIT_COMMAS_TO_ARRAY = Proc.new do |value|
    value.split(',').map(&:strip)
  end

  SERIALIZATION_STRATEGIES = {
    GlobalSetting.job_functions_key => SPLIT_COMMAS_TO_ARRAY
  }
  SERIALIZATION_STRATEGIES.default = NO_OP

  GlobalSetting::SETTING_NAMES.each do |setting_name|
    define_method(setting_name) do
      cache.get_or_set(setting_name, expires_in: CACHE_EXPIRATION_SECONDS) do
        value = GlobalSetting.find_by(name: setting_name).try(:value)
        SERIALIZATION_STRATEGIES[setting_name].call(value)
      end
    end
  end

  delegate :unset, :reset, to: :cache, prefix: true
  
  def cache
    @cache ||= MiniCache::Store.new
  end
end
