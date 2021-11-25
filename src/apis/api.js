import { http } from "./request";

// const HOST = "http://82.156.121.144:8080";
const HOST = "http://119.91.151.31:8004";


export const get_my_userinfo = () => http.get(HOST+'/user/userinfo/')
export const login = params => http.post(HOST+'/user/login/', params)

export const get_blog_list = params => http.get(HOST+'/blog/blog/', params)
export const get_blog_list1 = params => http.get(HOST+'/blog/blog_list/', params)
export const create_blog = params => http.post(HOST+'/blog/blogitem/', params)
export const get_tags_base = params => http.get(HOST+'/blog/get_tags/', params)
export const get_types_base = params => http.get(HOST+'/blog/get_types/', params)
export const patch_blog = params => http.patch(HOST+'/blog/blogitem/%(id)d/', params)
export const delete_blog = params => http.delete(HOST+'/blog/blogitem/%(id)d', params)
export const get_blog_detail = params => http.get(HOST+'/blog/blogitem/%(id)d/', params)
export const get_latest_blog = params => http.get(HOST+'/blog/get_latest_blog/', params)
export const get_group_by_date = params => http.get(HOST+'/blog/get_group_by_date/', params)
export const get_group_by_tag = params => http.get(HOST+'/blog/get_group_by_tag/', params)
export const get_web_statis = params => http.get(HOST+'/blog/get_web_statis/', params)
export const upload_image = params => http.post(HOST+'/blog/image/', params)
export const get_comment = params => http.get(HOST+'/blog/comment/', params)
export const create_comment = params => http.post(HOST+'/blog/comment/', params)