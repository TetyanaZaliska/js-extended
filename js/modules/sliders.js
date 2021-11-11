function sliders() {
    // Slider

    const slider = document.querySelector('.offer__slider');

    function getSZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // showSimpleSlider(slider);
    showBeutifulSlider(slider);

    function showBeutifulSlider(slider) {
        const allSliders = slider.querySelectorAll('.offer__slide'),
              current = slider.querySelector('#current'),
              total = slider.querySelector('#total'),
              slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
              slidesField = slider.querySelector('.offer__slider-inner'),
              width = window.getComputedStyle(slidesWrapper).width;
        
        let slideIndex = 1;
        let offset = 0;

        slidesField.style.width = 100 * allSliders.length + '%';
        slidesField.style.transition = '0.5s all';
        slidesField.style.display = 'flex';

        slidesWrapper.style.overflow = 'hidden';


        allSliders.forEach(slide => slide.style.width = width);

        slider.style.position = 'relative';
        const indicators = document.createElement('ol'),
              dots = [];
        indicators.classList.add('carousel-indicators');
        slider.append(indicators);

        for (let i = 0; i < allSliders.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.classList.add('dot');
            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        } 
        
        

        slidesField.style.transform = `translateX(-${offset}px)`;

        const showBSlide = (num) => {
            current.innerHTML = getSZero(num);
            total.innerHTML = getSZero(allSliders.length);  

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[num - 1].style.opacity = '1';
        };

        showBSlide(slideIndex);

        function deleteNotDigits(str) {
            return +str.replace(/\D/g, "");
        }

        function plusSlides(n) {
            slideIndex += n;
            offset = offset + n*deleteNotDigits(width);

            if (slideIndex > allSliders.length) {
                slideIndex = 1;  
                offset = 0;
            }
            if (slideIndex < 1) {
                slideIndex = allSliders.length;  
                offset = deleteNotDigits(width) * (allSliders.length - 1);
            }
            showBSlide(slideIndex);  
            
        } 
 
        slider.querySelector('.offer__slider-prev').addEventListener('click', (e) => { 
            plusSlides(-1);  
        });

        slider.querySelector('.offer__slider-next').addEventListener('click', (e) => { 
            plusSlides(1); 
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = deleteNotDigits(width) * (slideIndex - 1);
                showBSlide(slideIndex);  
            });
        });
    }

    function showSimpleSlider(slider) { 
        const allSliders = slider.querySelectorAll('.offer__slide'),
              current = slider.querySelector('#current'),
              total = slider.querySelector('#total');
        
        let slideIndex = 1;

 
        const showSlide = (num) => {
            current.innerHTML = getSZero(num);
            total.innerHTML = getSZero(allSliders.length);

            // allSliders.forEach(item => item.style.display = 'none');
            // allSliders[num-1].style.display = 'block';

            allSliders.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show');
            }); 
            allSliders[num-1].classList.add('show');
            allSliders[num-1].classList.remove('hide');
        };

        showSlide(slideIndex);

        function plusSlides(n) {
            slideIndex += n;
            if (slideIndex > allSliders.length) {
                slideIndex = 1;
            }
            if (slideIndex < 1) {
                slideIndex = allSliders.length;
            }
            showSlide(slideIndex);
        } 
 
        slider.querySelector('.offer__slider-prev').addEventListener('click', (e) => { 
            plusSlides(-1);
        });

        slider.querySelector('.offer__slider-next').addEventListener('click', (e) => { 
            plusSlides(1);
        });
 
    }

    // Пример как работает fetch - сайт где можно быстро протестить
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({name: 'Alex'})
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

}


module.exports = sliders;