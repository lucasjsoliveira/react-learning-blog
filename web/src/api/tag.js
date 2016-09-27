/**
 * Created by lucas on 23/09/16.
 */
import {fetchJson} from './../fetch-json';
export default class {
    static index() {
        return fetchJson('/api/tag/');
    }
}