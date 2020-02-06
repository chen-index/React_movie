// import { getPosts } from '../services/'
import fetchJSONP from "fetch-jsonp";

export const loadPostsAction = async (dispatch) => {
  const url = `http://node.kg.qq.com/cgi/fcgi-bin/kg_ugc_get_homepage?type=get_uinfo&start=1&num=8&share_uid=669f9f8320283283`

  let promise = await fetchJSONP(url, {
      jsonpCallbackFunction: 'MusicJsonCallback'
    })
  ;
  let dataS = promise.json();
  dataS.then(data => {
    // console.log(data);
    const musics = data.data
    dispatch({
      type: 'LOAD_MUSICS',
      payload: musics
    })
  })
}
