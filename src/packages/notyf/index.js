let Notyf = function(){
  //List of notifications currently active
  this.notifications = [];

  var defaults = {
    delay:2000,
    alertIcon:'notyf__icon--alert',
    confirmIcon:'notyf__icon--confirm'
  }

  if (arguments[0] && typeof arguments[0] == "object"){
    this.options = extendDefaults(defaults, arguments[0]);
  }else{
    this.options = defaults;
  }
  let notyfs = document.getElementsByClassName('notyf');
  let temp;
  if(0==notyfs.length){
    var docFrag = document.createDocumentFragment();
    temp = document.createElement('div');
    temp.className = 'notyf';
    docFrag.appendChild(temp);
    document.body.appendChild(docFrag);
  }
  else{
    temp = notyfs[0]
  }
  this.container = temp;
  this.animationEnd = animationEndSelect();
}

Notyf.prototype.alert = function(alertMessage){
  var card = buildNotificationCard.call(this, alertMessage, this.options.alertIcon);
  card.className += ' notyf--alert';
  this.container.appendChild(card);
  this.notifications.push(card);
}

Notyf.prototype.confirm = function(alertMessage){
  var card = buildNotificationCard.call(this, alertMessage, this.options.confirmIcon);
  card.className += ' notyf--confirm';
  this.container.appendChild(card);
  this.notifications.push(card);
}

function extendDefaults(source, destination){
  for (property in destination){
    //Avoid asigning inherited properties of destination, only asign to source the destination own properties
    if(destination.hasOwnProperty(property)){
      source[property] = destination[property];
    }
  }
  return source;
}

function buildNotificationCard(messageText, iconClass){
  //Card wrapper
  var notification = document.createElement('div');
  notification.className = 'notyf__toast';

  var wrapper = document.createElement('div');
  wrapper.className = 'notyf__wrapper';

  var iconContainer = document.createElement('div');
  iconContainer.className = 'notyf__icon';

  var icon = document.createElement('i');
  icon.className = iconClass;

  var message = document.createElement('div');
  message.className = 'notyf__message';
  message.innerHTML = messageText;

  //Build the card
  iconContainer.appendChild(icon);
  wrapper.appendChild(iconContainer);
  wrapper.appendChild(message);
  notification.appendChild(wrapper);

  var _this = this;
  setTimeout(function(){
      notification.className += " notyf--disappear";
      notification.addEventListener(_this.animationEnd, function(event){
        event.target == notification && _this.container.removeChild(notification);
      });
      var index = _this.notifications.indexOf(notification);
      _this.notifications.splice(index,1);
  },_this.options.delay);

  return notification;
}

function animationEndSelect() {
  var t;
  var el = document.createElement('fake');
  var transitions = {
    'transition':'animationend',
    'OTransition':'oAnimationEnd',
    'MozTransition':'animationend',
    'WebkitTransition':'webkitAnimationEnd'
  }

  for(t in transitions){
      if( el.style[t] !== undefined ){
          return transitions[t];
      }
  }
}

export default Notyf;
