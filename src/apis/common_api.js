

import { get_tag_list_base } from '../apis/api'


export const get_tag_list = (type) => {
    var tag_list=new Array();
    get_tag_list({
        query:{
            type_list: type,
        }
    }).then((res) => {
        tag_list = res.data;
    })
    return tag_list
}