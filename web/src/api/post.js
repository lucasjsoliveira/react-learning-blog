/**
 * Created by lucas on 23/09/16.
 */
import {fetchJson, postJson} from './../fetch-json';
export default {
    index(page) {
        return fetchJson(`/api/post?page=${page}`);
    }
}