import { http } from "./request";

const HOST = "http://yukimura.club/api";
// const HOST = "http://119.91.151.31:8004/api";


export const get_my_userinfo = () => http.get(HOST+'/user/userinfo/')
export const login = params => http.post(HOST+'/user/login/', params)

export const get_blog_list = params => http.get(HOST+'/blog/blog_list/', params)
export const create_blog = params => http.post(HOST+'/blog/blogitem/0/', params)
export const get_tag_list_base = params => http.get(HOST+'/blog/get_tag_list/', params)
export const get_type_list_base = params => http.get(HOST+'/blog/get_type_list/', params)
export const patch_blog = params => http.patch(HOST+'/blog/blogitem/%(id)d/', params)
export const delete_blog = params => http.delete(HOST+'/blog/blogitem/%(id)d', params)
export const get_blog_detail = params => http.get(HOST+'/blog/blogitem/%(id)d/', params)
export const get_latest_blog = params => http.get(HOST+'/blog/get_latest_blog/', params)
export const get_group_by_date = params => http.get(HOST+'/blog/get_group_by_date/', params)
export const get_group_by_tag = params => http.get(HOST+'/blog/get_group_by_tag/', params)
export const get_web_statis = params => http.get(HOST+'/blog/get_web_statis/', params)
export const upload_image = params => http.post(HOST+'/blog/image/', params)
export const get_comment_list = params => http.get(HOST+'/blog/comment_list/%(blog_id)d/', params)
export const create_comment = params => http.post(HOST+'/blog/comment/', params)