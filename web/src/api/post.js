/**
 * Created by lucas on 23/09/16.
 */
import {fetchJson, postJson} from './../fetch-json';
export default class {
    static index(page) {
        return fetchJson(`/api/post?page=${page}`);
    }

    static load(id) {
        return fetchJson(`/api/post/view?id=${id}`);
    }

    static submit(model) {
        return postJson('/api/post/submit', model);
    }
}