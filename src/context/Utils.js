
export const SortArray = (list) => {
    const arr = [...list]
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (parseInt(arr[j][2]._hex, 16) < parseInt(arr[j + 1][2]._hex, 16)) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;

            }
        }
    }

    return (arr)
}
