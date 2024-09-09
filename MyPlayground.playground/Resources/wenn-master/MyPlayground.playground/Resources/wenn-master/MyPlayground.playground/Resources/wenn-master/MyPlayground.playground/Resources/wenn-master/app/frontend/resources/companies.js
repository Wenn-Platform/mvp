import resourceBuilder from './resource_builder'
import defaultResourceSchema from './default_resource_schema'

const { index, show } = defaultResourceSchema

const companiesResource = resourceBuilder.build('/companies', {
  index,
  show
})

window.companiesResource = companiesResource

export default companiesResource
