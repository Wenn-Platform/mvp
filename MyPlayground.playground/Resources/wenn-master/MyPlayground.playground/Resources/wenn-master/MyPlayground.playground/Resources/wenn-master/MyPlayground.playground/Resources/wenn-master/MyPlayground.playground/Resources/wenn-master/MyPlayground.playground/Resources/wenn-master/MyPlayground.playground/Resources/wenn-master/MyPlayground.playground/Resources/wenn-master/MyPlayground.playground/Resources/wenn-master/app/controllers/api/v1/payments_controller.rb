class Api::V1::PaymentsController < Api::V1::BaseApiController
#   respond_to :json

#   def pay
#     @payment = Payment.charge(
#       token: resource_params[:token],
#       amount: resource_params[:amount],
#       user: current_user
#     )
#     render json: :ok
#   rescue => e
#     render_error(message: e.message)
#   end

#   def subscribe
#     @subscription = Payment.subscribe(
#       token: resource_params[:token],
#       user: current_user,
#       plan: resource_params[:plan]
#     )
#     render json: :ok
#   rescue => e
#     render_error(message: e.message)
#   end

#   private

#   def resource_params
#     params.require(:payment).permit(
#       :token,
#       :amount,
#       :plan
#     )
#   end
end
