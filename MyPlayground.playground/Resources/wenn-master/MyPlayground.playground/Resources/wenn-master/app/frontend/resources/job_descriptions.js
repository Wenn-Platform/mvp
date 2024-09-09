import resourceBuilder from './resource_builder'
import defaultResourceSchema from './default_resource_schema'

const { index, show } = defaultResourceSchema

const jobDescriptionsResource = resourceBuilder.build('/job_descriptions', {
  index,
  show
})

window.jobDescriptionsResource = jobDescriptionsResource

export default jobDescriptionsResource
