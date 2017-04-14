import network from '../network.js'
import TaggedApi from '../../classes/TaggedApi'

class UserApi extends TaggedApi {

  /** USERS API  */

  /**
   * Register an user.
   * @param {Object} data {
   *    @param {String} name
   *    @param {String} email
   *    @param {String} password
   *    @param {String} password_confirmation
   *    @param {Boolean} terms_and_conditions
   *    @param {Date} birthday (Optional)
   *    @param {String} nro_doc (Optional)
   *    @param {String} gender (Masculino / Femenino) (Optional)
   *    @param {String} description (Optional)
   *    @param {String} mobile_phone (Optional)
   *  }
   * @return {} 
  */
  register(data) {
    return this.post('/api/users', data)
  }

  /**
   * Update an user.
   * @param {Object} data {
   *    @param {String} name
   *    @param {String} email
   *    @param {String} password
   *    @param {String} password_confirmation
   *    @param {Date} birthday (Optional)
   *    @param {String} nro_doc (Optional)
   *    @param {String} gender (Masculino / Femenino) (Optional)
   *    @param {String} description (Optional)
   *    @param {String} mobile_phone (Optional)
   *  }
   * @return {} 
  */
    update(data) {
      return this.put('/api/users', data)
  }
  
  /**
   * Update user photo.
   * @param {Object} data {
   *    @param {File} profile (Image)
   *  }
   * @return {} 
  */
    updatePhoto(data) {
      return this.put('/api/users/photo', data)
    }
  
  /**
   * Update user photo.
   * @param {Object} data {
   *    @param {File} profile (Image)
   *  }
   * @return {} 
  */
    updatePhoto(userId) {
      return this.get('/api/users/' + userId)
    }

    /**
   * Show an user.
   * @param {Integer} id 
   * @return User 
  */
  show(id) {
    return this.post('/api/users/' + id, {});
  }
}

export { UserApi as default }