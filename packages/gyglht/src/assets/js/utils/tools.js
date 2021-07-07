// 在一个数组中寻找另一个数组中不存在的元素
// arr2中寻找arr1中不存在的元素
export function searchSingleItem(arr1, arr2) {
	if (!arr2.length) return

	let map = new Map(),
		helpArr = []
	for (let i = 0; i < arr1.length; i++) {
		map.set(arr1[i].planId, 1)
	}
	for (let i = 0; i < arr2.length; i++) {
		if (!map.has(arr2[i].planId)) {
			helpArr.push(arr2[i])
		}
	}
	return helpArr
}
