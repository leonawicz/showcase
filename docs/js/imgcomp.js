// Call & init
$(document).ready(function(){
  $('.ba-slider').each(function(){
    var cur = $(this);
    // Adjust the slider
    var height = cur.height()+'px';
    cur.find('.resize img').css('height', height);
    // Bind dragging events
    drags(cur.find('.handle'), cur.find('.resize'), cur);
  });
});

// Update sliders on resize. 
// Because we all do this: i.imgur.com/YkbaV.gif
$(window).resize(function(){
  $('.ba-slider').each(function(){
    var cur = $(this);
    var height = cur.height()+'px';
    cur.find('.resize img').css('height', height);
  });
});

function drags(dragElement, resizeElement, container) {
	
  // Initialize the dragging event on mousedown.
  dragElement.on('mousedown touchstart', function(e) {
    
    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');
    
    // Check if it's a mouse or touch event and pass along the correct value
    var startY = (e.pageY) ? e.pageY : e.originalEvent.touches[0].pageY;
    
    // Get the initial position
    var dragHeight = dragElement.outerHeight(),
        posY = dragElement.offset().top + dragHeight - startY,
        containerOffset = container.offset().top,
        containerHeight = container.outerHeight();
 
    // Set limits
    minLeft = containerOffset + 10;
    maxLeft = containerOffset + containerHeight - dragHeight - 10;
    
    // Calculate the dragging distance on mousemove.
    dragElement.parents().on("mousemove touchmove", function(e) {
    	
      // Check if it's a mouse or touch event and pass along the correct value
      var moveY = (e.pageY) ? e.pageY : e.originalEvent.touches[0].pageY;
      
      leftValue = moveY + posY - dragHeight;
      
      // Prevent going off limits
      if ( leftValue < minLeft) {
        leftValue = minLeft;
      } else if (leftValue > maxLeft) {
        leftValue = maxLeft;
      }
      
      // Translate the handle's left value to masked divs Height.
      HeightValue = (leftValue + dragHeight/2 - containerOffset)*100/containerHeight+'%';
			
      // Set the new values for the slider and the handle. 
      // Bind mouseup events to stop dragging.
      $('.draggable').css('top', HeightValue).on('mouseup touchend touchcancel', function () {
        $(this).removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      $('.resizable').css('height', HeightValue);
    }).on('mouseup touchend touchcancel', function(){
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
    e.preventDefault();
  }).on('mouseup touchend touchcancel', function(e){
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
  });
}
