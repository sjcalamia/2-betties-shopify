define(['jquery', 'utils'], function($, utils){

  console.log('Module Drawers is loaded');

  function Drawers (options) {
    console.log('Creating a Drawer with the following options',options)
    var defOpt = {
      openScrollToTop : false,
      DOM : {}
    };

    this.options = utils.mergeOptions(defOpt, options);

    this.DOM = utils.domFinder(this.options.DOM);
    console.log('openBtn',this.DOM.openBtn)

    //this.DOM.overlay = _getOverlay();

    //this.DOM.container.appendChild(this.DOM.overlay);

    this.DOM.openBtn.addEventListener('click', function() {
      console.log(this," clicked...well, maybe, because 'this' was bound at assignment...");
      var self = this;

      if (this.options.openScrollToTop && $(window).scrollTop() > 0) {
        $('html, body').animate({
          scrollTop: 0
        }, 500, function() {
          console.log("setting timeout for scroll to top ",self)
          setTimeout(function() {
            console.log("Timout expired, opening drawer ")
            self._openDrawer();
          }, 300);
        });
      } else {
        console.log("Not scrolled to top, opening drawer ")
        self._openDrawer();
      }

    }.bind(this));

    this.DOM.closeBtn.addEventListener('click', function() {
      this._closeDrawer();
    }.bind(this));

    this.DOM.container.addEventListener('click', function(e) {

      if (e.target == e.currentTarget) {
        utils.triggerEvent(document.body, 'overlay-clicked');
        this._closeDrawer();
      }

    }.bind(this));

    var scrollablElement = this.DOM.container.firstElementChild;
    scrollablElement.addEventListener("touchstart", function (e) {

      var top = scrollablElement.scrollTop,
        totalScroll = scrollablElement.scrollHeight,
        currentScroll = top + scrollablElement.offsetHeight;

      if (top === 0) {
        scrollablElement.scrollTop = 1;
      } else if (currentScroll >= totalScroll) {
        scrollablElement.scrollTop = top - 1;
      }

    });

  }


  Drawers.prototype._openDrawer = function () {
    if (this.DOM.container.classList.contains('close')) {
      this.DOM.container.classList.add('open');
      this.DOM.container.classList.remove('close');
    }

    //document.ontouchmove = this._touchDrawerFix.bind(this);
    utils.triggerEvent(document.body, 'drawer-open');
  }

  Drawers.prototype._closeDrawer = function (drawer) {
    if (this.DOM.container.classList.contains('open')) {
      this.DOM.container.classList.add('close');
      this.DOM.container.classList.remove('open');
    }

    //document.ontouchmove = null;
    utils.triggerEvent(document.body, 'drawer-closed');
  }

/*  Drawers.prototype._touchDrawerFix = function ( event ) {

    var isTouchMoveAllowed = true, target = event.target;

    while ( target !== null ) {
        if ( target == this.DOM.container ) {
          isTouchMoveAllowed = true;
          break;
        }

        if ( target == document.body ) {
          isTouchMoveAllowed = false;
          break;
        }

        target = target.parentNode;
    }

    if ( !isTouchMoveAllowed ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

  }

  function _getOverlay() {

    // Add overlay for drawers
    overlay = document.createElement('div');

    overlay.className = 'overlay overlay--drawers';

    overlay.addEventListener('click', function() {
      utils.triggerEvent(document.body, 'overlay-clicked');
    });

    return overlay;
  }*/

  return Drawers;


});
