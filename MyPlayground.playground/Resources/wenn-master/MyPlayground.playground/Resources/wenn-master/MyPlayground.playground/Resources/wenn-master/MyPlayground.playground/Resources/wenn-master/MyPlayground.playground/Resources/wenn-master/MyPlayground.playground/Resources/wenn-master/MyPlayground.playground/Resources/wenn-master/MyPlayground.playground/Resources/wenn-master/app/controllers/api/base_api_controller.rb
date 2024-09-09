# Generic API base controller. Add what can be reasonably expected
# to be shared by all the current and future API versions.
#
# Every API version has its own BaseApiController, where
# the code that is specific to that API version should go.
class Api::BaseApiController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
end
