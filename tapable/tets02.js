
function main(){
	let n, m, i, min, max, mid,c;
	let length = []; 
    n =3
    m = 4
    let sum = 0;
    length = [3,5,4]
    for (i = 0; i < n; i++) {
        sum +=length[i];
    }

    
    min = 1;
    max=100000;
    while (min<max) {
        mid = (min+max+1)/2;
        c = 0;
        for (i = 0; i < n; i++)
        	c +=length[i]/mid;
        if (c < m) 
			max = mid - 1;
        else
            min = mid;
    }
    console.log(min);
    return 0;
}
main()
