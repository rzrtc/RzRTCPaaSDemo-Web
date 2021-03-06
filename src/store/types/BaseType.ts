import {
  types,
} from 'mobx-state-tree'
import _ from 'lodash'

const BaseType = (
  types.model({}).named('BaseType').actions((self) => ({
    update(part: _.Dictionary<unknown> | _.NumericDictionary<unknown>) {
      if (_.isPlainObject(part) === true && _.isEmpty(part) === false) {
        _.each(_.entries(part), (entry) => {
          const [key, value] = entry
          if (self[key] !== undefined) {
            // eslint-disable-next-line no-param-reassign
            self[key] = value
          }
        })
      }
    },
  }))
)

export default BaseType
