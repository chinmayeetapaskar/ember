import Controller from '@ember/controller';
import { gte } from '@ember/object/computed';
import { and } from '@ember/object/computed';
import { match, not } from '@ember/object/computed';
export default Controller.extend({
  responseMessage: '',
//  textMessage: '',
  emailAddress: '',
  message :'',
  headerMessage :'Comming Soon...',

  isValid: match('emailAddress', /^.+@.+\..+$/),
  isLongEnough: gte('message.length', 5),

  isBothTrue: and('isValid', 'isLongEnough'),
  isDisabled: not('isBothTrue'),


  actions: {

    sendInvitation() {
      alert(`Send the following message is in progress: ${this.get('emailAddress')} \n ${this.get('message')}`);
      this.set('responseMessage', `Thank you! We've just saved`);
      this.set('emailAddress', '');
      this.set('message', '');
    }
  }

});
