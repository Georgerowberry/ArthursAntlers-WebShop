(function($){
  $(function(){
    $('.modal').modal();
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
        $('.scrollspy').scrollSpy({
            scrollOffset: 0
        }
        );


  }); // end of document ready
})(jQuery); // end of jQuery name space


$(document).ready(function () {
    $('.responsive-products').slick({
                dots: false,
                infinite: true,
                arrows: true,
                prevArrow: '<i class="material-icons slick-prev pull-left a_red large">navigate_before</i>',
                nextArrow: '<i class="material-icons slick-next a_red large">navigate_next</i>',
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 2,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    },

                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });



    simpleCart.shipping(function(){
                var total = 0;
                simpleCart.each( function( item ){
                    if( item.get('gift') == 'on' ){
                        total+= item.quantity()*3;
                } else {
                  total+= 0;
                    }
              });
              return total;
            });

         simpleCart.bind( 'beforeCheckout' , function(data){
                      data.comment = document.getElementById("comment-input").value;

                  });

        simpleCart({
            checkout: {
                type: "PayPal",
                email: "tomkear@hotmail.co.uk"

                    },


            shippingCustom: function(){
                var offer = 0;
                var total = 0;
                if(simpleCart.total() > 50){
                    offer = 0;
                } else {
                    offer += 3;
                }
                    simpleCart.each(function (item) {
                        if( item.get('gift') == "Yes" ){
                        total+= item.quantity()*3;
                    }

                });
                    return total + offer;
         },







            cartColumns: [
                { view: function(item, column){
                        return"<img src='"+item.get('image')+"'>";
                        },
                    attr: 'image' },




                { attr: "name" , label: "Name" } ,
                { attr: "price" , label: "Price", view: 'currency' } ,
                { view: "decrement" , label: false , text: "-" } ,
                { attr: "quantity" , label: "Qty" } ,
                { view: "increment" , label: false , text: "+" } ,
                { attr: "total" , label: "SubTotal", view: 'currency' } ,
                { view: "remove" , text: "Remove" , label: false },
                { attr: "gift" , label: "Gift?"},
                { view: "shipping" , text: "Shipping" }
    ],
            cartStyle: 'table'





                 });



});

function show_all() {
    $('#show_all').hide();
    $('.product-list').fadeOut();
    $('#all_products').fadeIn();

}

function product_view(id){
  console.log(id);
    {% for p in products %}
    if ({{ p.id }} == id){
      var price = '£{{ p.price }}';
      var description = '{{ p.description }}';

      var figures = '<figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">\n' +
      '                        <a href="static/{{ p.images.image1.url }}" itemprop="contentUrl"\n' +
      '                           data-size="1024x1024">\n' +
      '                            <img id="first_p_img" class="img-responsive" src="static/{{ p.images.image1.url }}"\n' +
      '                                 itemprop="thumbnail"/>\n' +
      '                        </a>\n' +
      '                    </figure>';
    }

    {% if p.images.image2 %}
    if ({{ p.id }} == id)
    {
        figures += '<figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">\n' +
            '                        <a href="static/{{ p.images.image2.url }}" itemprop="contentUrl"\n' +
            '                           data-size="1024x1024">\n' +
            '                            <img id="p_img" class="img-responsive" src="static/{{ p.images.image2.url }}"\n' +
            '                                 itemprop="thumbnail"/>\n' +
            '                        </a>\n' +
            '                    </figure>';
    }
    {% endif %}
    {% endfor %}


  $('.my-gallery').html(figures);
    $('#pro_des').text(description);
    $('#price').text(price);
  $('#product_modal').modal('open');
}



// photoswipe


var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');