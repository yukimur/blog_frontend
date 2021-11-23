

import { get_tags_base } from '../apis/api'


export const get_tags = (type) => {
    var tags=new Array();
    get_tags_base({
        query:{
            types: type,
        }
    }).then((res) => {
        tags = res.data;
    })
    return tags
}