/**
 * Created by lucas on 23/09/16.
 */
import {fetchJson, postJson} from './../fetch-json';
export default class {
    static index(page) {
        return fetchJson(`/api/post?page=${page}`);
    }

    static load(id, fullTags = false) {
        return fetchJson(`/api/post/view?id=${id}&fullTags=${fullTags}`);
    }

    static submit(model) {
        return postJson('/api/post/submit', model);
    }

    static getByTag(tagId, page) {
        return fetchJson(`/api/post/get-by-tag?tagId=${tagId}&page=${page}`);
    }
}