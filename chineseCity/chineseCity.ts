import { chineseCities } from "./chineseCities"

/** 获取所有地区 */
export function getAllAreas() {
	return Object.keys(chineseCities.areas)
}

/**
 * 获取地区下的所有省(自治州、直辖市)
 * @param area 地区名
 */
export function getProvincesOfArea(area: string) {
	return chineseCities.areas[area]?.split("|") ?? []
}

/**
 * 获取省(自治州、直辖市)下的地级市(州)
 * @param province 省(自治州、直辖市)
 */
export function getCitiesOfProvince(province: string) {
	return chineseCities.provinces[province]?.split("|")
}

/**
 * 获取地级市(州)下的区（县）
 * @param city 地级市(州)
 */
export function getDistrictsOfCity(city: string) {
	return chineseCities.cities[city]?.split("|")
}

/**
 * 判断指定的地名是否是省(自治州、直辖市)
 * @param name 地名
 */
export function isProvince(name: string) {
	return name in chineseCities.provinces
}