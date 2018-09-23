function upperBound(account_name) {
    let last = account_name.slice(-1);
    switch (last) {
        case '5':
            last = 'a';
            break;
        case '.':
            last = '1';
            break;
        case 'z':
            last = 'z1';
            break;
        default:
            last = String.fromCharCode(last.charCodeAt(0) + 1);
    }
    return account_name.slice(0, -1)+last;
}

console.log(upperBound('trevor'));
