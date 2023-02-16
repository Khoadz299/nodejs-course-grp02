exports.replaceTemplate = (template, product) => {
    //using replace by regular expression  - g means global


    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    return output;
}