function tabs(tabsSelector, tabContentSelector, tabsParentSelector, activeClass) {
    // Tabs

    const tabs = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');

        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

// module.exports = tabs;
export default tabs;