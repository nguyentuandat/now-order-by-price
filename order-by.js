function changeDirection(direction){
    // save to storage
    chrome.storage.sync.set({'direction': direction});
    console.log('direction', direction);
    let clsCategories = document.getElementsByClassName('scrollspy');
    
    if(clsCategories.length){
        for(var i=0; i < clsCategories.length; i++)
        {
            let cat_items = [];
            let cat_item_raw = clsCategories[i].getElementsByClassName('box-menu-detail');
            let title = clsCategories[i].getElementsByClassName('title-kind-food')[0]; 
            title.setAttribute('dataprice', 0);

            let items = [];
            for(var j = 0; j < cat_item_raw.length; j++){
                let item = cat_item_raw[j];
                price = cat_item_raw[j].getElementsByClassName('txt-blue')[0].innerText;
                price = price.replace(',', '');

                item.setAttribute('dataprice', price);

                items.push(item);
            }
            // sort data 
            items.sort( function ( a, b ) { 
                let p_a = parseFloat(a.getAttribute('dataprice'));
                let p_b = parseFloat(b.getAttribute('dataprice'));
                if(direction === 'desc'){
                    return p_b - p_a;
                }
                else{
                    return p_a - p_b;
                }
            } );

            clsCategories[i].appendChild(title);
            for(var k = 0; k < items.length; k++){
                clsCategories[i].appendChild(items[k]);
            }
        }

        let container = document.getElementsByClassName('detail-menu-kind')[0];
    }
}
chrome.storage.sync.get('direction', function(data){
    changeDirection(data.direction);
});
