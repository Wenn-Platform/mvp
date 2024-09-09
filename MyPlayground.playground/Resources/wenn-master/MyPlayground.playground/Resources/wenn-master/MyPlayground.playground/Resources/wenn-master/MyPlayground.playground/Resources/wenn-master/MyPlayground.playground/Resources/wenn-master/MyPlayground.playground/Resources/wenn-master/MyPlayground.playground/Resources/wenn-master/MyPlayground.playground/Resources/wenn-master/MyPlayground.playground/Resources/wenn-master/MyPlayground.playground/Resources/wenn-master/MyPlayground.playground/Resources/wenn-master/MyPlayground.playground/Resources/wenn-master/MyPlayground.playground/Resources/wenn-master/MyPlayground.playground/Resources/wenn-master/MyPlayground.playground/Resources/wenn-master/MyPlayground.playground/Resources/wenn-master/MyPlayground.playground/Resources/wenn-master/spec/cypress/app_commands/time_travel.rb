if command_options.present?
  Timecop.travel(eval(command_options)) # e.g. "7.days.from_now"
  logger.debug("Timecop set time to #{DateTime.now}")
else
  Timecop.return
  logger.debug("Timecop returned to true time (#{DateTime.now})")
end
