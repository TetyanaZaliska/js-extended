'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const nodesArr = [];

    function getAllNodes(element) {
        
        element.childNodes.forEach(noda => {

            if (noda.nodeName.match(/^H\d/)) {
                console.log(noda.nodeName);
                nodesArr.push({
                                headers: noda.nodeName,
                                content: noda.textContent
                            });
                console.log(noda.textContent);
            } else {
                getAllNodes(noda);
            }


            // if (noda.childNodes.length > 1) {
            //     getAllNodes(noda);
            // } else {
            //     if (noda.nodeName.match(/^H\d/)) {
            //         // nodesArr.push({
            //         //     headers: noda.nodeName,
            //         //     content: noda.textContent
            //         // });
            //         console.log(noda.nodeName);
            //         nodesArr.push(noda.textContent);
            //         console.log(noda.textContent);
            //     }
            //     // console.log(noda.nodeName);
            // }
            // nodesArr.push({
            //     headers: noda.nodeName,
            //     content: noda.textContent
            // });
            
        });
        return nodesArr;
    }
    console.log(getAllNodes(body));
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(nodesArr)
    })
        .then(response => response.json())
        .then(json => console.log(json));
    // console.log(body.childNodes);
});