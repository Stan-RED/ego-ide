import { ICurrentPlugin } from "src/store/reducers/core.reducer";
import inboxPlugin from "../list/inbox/InboxPlugin";
import namePlugin from "../list/name/NamePlugin";
import partPlugin from "../list/part/PartPlugin";
import pointPlugin from "../list/point/PointPlugin";
import scopePlugin from "../list/scope/ScopePlugin";
import tagsPlugin from "../list/tags/TagsPlugin";
import textPlugin from "../list/text/TextPlugin";
import topicPlugin from "../list/topic/TopicPlugin";
import { UnknownPlugin } from "../list/unknown/UnknownPlugin";
import userPlugin from "../list/user/UserPlugin";
import { IPlugin, IPluginService } from "../models";

export class PluginService implements IPluginService {
  get(currentPluginId: ICurrentPlugin): IPlugin {
    if (currentPluginId === "user") {
      return userPlugin;
    } else if (currentPluginId === "tags") {
      return tagsPlugin;
    } else if (currentPluginId === "inbox") {
      return inboxPlugin;
    } else if (currentPluginId === "text") {
      return textPlugin;
    } else if (currentPluginId === "scope") {
      return scopePlugin;
    } else if (currentPluginId === "name") {
      return namePlugin;
    } else if (currentPluginId === "part") {
      return partPlugin;
    } else if (currentPluginId === "topic") {
      return topicPlugin;
    } else if (currentPluginId === "point") {
      return pointPlugin;
    } else {
      return new UnknownPlugin(currentPluginId);
    }
  }
}

export const pluginService = new PluginService();
export default pluginService;
