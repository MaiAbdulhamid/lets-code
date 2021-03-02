/*global $, console*/
$(function () {
    'use strict';
    
    var clicked = false;
    //Show menu at xs screen
    $('.nav-line').on('click', function () {
        
        var $this = $('.nav-line');
        
        if (!clicked) {
            
            clicked = true;
            
            $this.parent().toggleClass('active');
            
            $('body').toggleClass('burger-active');
            
            setTimeout(function () {
                clicked = false;
            }, 1050);
        }

    });
    //Close menu when click on window
    
    $(document).on('click', function (e) {
        
        var clickElement = $(e.target);
        
        if(!clickElement.closest('.header').length && $('.nav-left').hasClass('active') ){
            
            $('.nav-left').removeClass('active');
            
            $('body').removeClass('burger-active');
        }
    });
    
    //Add sticky class to header
    var mainSec = $('.main-section'),
        
        header  = $('.header');
    
    $(window).on('scroll', function () {
        
        if ($(window).scrollTop() >= mainSec.height() - 100) {
            
            header.addClass('sticky');
            
        } else {
            
            header.removeClass('sticky');
        }
    });
    
	// Create slider function
    function mainSlider(){
        // cash items
        var $sliderContainer = $('.slider-container'),
            $slider = $sliderContainer.find('.main-slider'),
            $sliderBanner = $slider.find('.slider-banner'),
            $sliderItems = $slider.find('.slider-item'),
            itemsLength = $sliderItems.length,
            $nextBtn = $slider.next('.slider-arrow').find('.arrow.next'),
            $prevBtn = $slider.next('.slider-arrow').find('.arrow.prev'),

            itemWidth,
            allItems,

            itemMove = 0,
            left = 0,
            
            resizeItemWidth,
            itemsToShow = 3,
            activeItems = itemsToShow;
        
        //function to calc The number of items to show at media screen
        function calcItems(){
            
            //To remove the additon item
            activeItems -= itemsToShow;
            //for responsive
			if($(window).width() <= 991 && $(window).width() >= 765){
                itemsToShow = 2
            }else if($(window).width() < 765){
                itemsToShow = 1
            }else{
				itemsToShow = 3
			};
            //To be the same number
            activeItems += itemsToShow;

            //items width after calc itemsTo show
            resizeItemWidth = parseInt($slider.width() / itemsToShow);
            $sliderItems.outerWidth(resizeItemWidth);
        }
        calcItems()

        //function to return The Left to be calculated on resize
        function calcLeft(){
        	//itemWidth is the outer width of the item
        	//itemMove variable to calc the numbers of moveing items
            return -(itemWidth * itemMove);
        }
        //function to calc the width of slider-banner on resizing
        function fixWidth(){
            //calling itemsToShow
            calcItems()
            //items-banner width
            itemWidth = $sliderItems.outerWidth();
            allItems = itemWidth * itemsLength;
            $sliderBanner.width(allItems);
        };
        fixWidth()
        calcLeft()
        //fix width items and slidder-banner at resizing
        $(window).resize(function () {
            //calling itemsToShow
            calcItems()
            $sliderBanner.css({left: calcLeft() });
            fixWidth()
        });
        //variable to prevent more than one click at once
        var click = false;
        //to add disable class after the last item and remove it
        function addDisable(){
            if(activeItems == itemsLength){
                $nextBtn.addClass('disable');
            }else{
                $nextBtn.removeClass('disable');
            }
            //add disable class for prev btn
            if(activeItems == itemsToShow){
                $prevBtn.addClass('disable');
            }else{
                $prevBtn.removeClass('disable');
            }
        }
        addDisable()
        //click enents on btns
        //nextbtn
        $nextBtn.click(function (){
        	//check if $chlick is true
            if(!click){
            	//check if there is items to show
                if(activeItems != itemsLength){
                    click = true;
                    //calc itemsMove
                    itemMove++;
                    //calling left function
                    left = calcLeft();
                    $sliderBanner.css({left: left});
                    //increasing activeItems onclick
                    activeItems++;
                    //prevent more than one click per 500ms
                    setInterval(function(){
                        click = false;
                    }, 500);
                    addDisable()
                }
            }
        })
        //the same here but decrease instead of increase 
        $prevBtn.click(function (){
            if(!click){
                if(activeItems > itemsToShow){
                    click = true;
                    itemMove--;
                    left = calcLeft();
                    $sliderBanner.css({left: left });
                    activeItems--;
                    setInterval(function(){
                        click = false;
                    }, 500);
                    addDisable()
                }
            }
        })
    }
	mainSlider()
    
// Create slider function
function testSlider(){
        // cash items
        var $sliderContainer = $('.slider-container'),
            $slider = $sliderContainer.find('.test-slider'),
            $sliderBanner = $slider.find('.slider-banner'),
            $sliderItems = $slider.find('.slider-item'),
            itemsLength = $sliderItems.length,
            $nextBtn = $slider.next('.slider-arrow').find('.arrow.next'),
            $prevBtn = $slider.next('.slider-arrow').find('.arrow.prev'),

            itemWidth,
            allItems,

            itemMove = 0,
            left = 0,
            
            resizeItemWidth,
            itemsToShow =1,
            activeItems = itemsToShow;
        //function to calc The number of items to show at media screen

        function calcItems(){
            
            //items width after calc itemsTo show
            resizeItemWidth = parseInt($slider.width() / activeItems);
            $sliderItems.outerWidth(resizeItemWidth);
        }
        calcItems()

        //function to return The Left to be calculated on resize
        function calcLeft(){
        	//itemWidth is the outer width of the item
        	//itemMove variable to calc the numbers of moveing items
            return -(itemWidth * itemMove);
        }
    
        //function to calc the width of slider-banner on resizing
        function fixWidth(){
            calcItems()
            //items-banner width
            itemWidth = $sliderItems.outerWidth();
            allItems = itemWidth * itemsLength;
            $sliderBanner.width(allItems);
        };
        fixWidth()
        calcLeft()
        //fix width items and slidder-banner at resizing
        $(window).resize(function () {
            //calling itemsToShow
            $sliderBanner.css({left: calcLeft() });
            fixWidth()
        });
    
        //variable to prevent more than one click at once
        var click = false;
        //to add disable class after the last item and remove it
        function addDisable(){
            if(activeItems == itemsLength){
                $nextBtn.addClass('disable');
            }else{
                $nextBtn.removeClass('disable');
            }
            //add disable class for prev btn
            if(activeItems == itemsToShow){
                $prevBtn.addClass('disable');
            }else{
                $prevBtn.removeClass('disable');
            }
        }
        addDisable()
        //click enents on btns
        //nextbtn
        $nextBtn.click(function (){
        	//check if $chlick is true
            if(!click){
            	//check if there is items to show
                if(activeItems != itemsLength){
                    click = true;
                    //calc itemsMove
                    itemMove++;
                    //calling left function
                    left = calcLeft();
                    $sliderBanner.css({left: left});
                    //increasing activeItems onclick
                    activeItems++;
                    //prevent more than one click per 500ms
                    setInterval(function(){
                        click = false;
                    }, 500);
                    addDisable()
                }
            }
        })
        //the same here but decrease instead of increase 
        $prevBtn.click(function (){
            if(!click){
                if(activeItems > 1){
                    click = true;
                    itemMove--;
                    left = calcLeft();
                    $sliderBanner.css({left: left });
                    activeItems--;
                    setInterval(function(){
                        click = false;
                    }, 500);
                    addDisable()
                }
            }
        })
    }
	testSlider()
});