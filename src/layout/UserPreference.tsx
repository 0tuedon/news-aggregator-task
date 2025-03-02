import "./UserPreference.sass";
import { WithContext as ReactTags, Tag } from "react-tag-input";
import { allSources } from "../utils/data";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  addAuthor,
  addCategory,
  addSource,
  removeAuthor,
  removeCategory,
  removeSource,
} from "../store/userPreferenceSlice";

const UserPreference = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.userPreferences);
  const reactTagClassNames = {
    tagInputField: "preferences-content__field-input",
    tag: "preferences-content__field-tag",
    tags: "preferences-content__field-tags",
  };
  const handleDelete = (
    i: number,
    type: "authors" | "categories" | "sources"
  ) => {
    if (type === "authors") dispatch(removeAuthor(i));
    if (type === "categories") dispatch(removeCategory(i));
    if (type === "sources") dispatch(removeSource(i));
  };

  const handleAddition = (
    tag: Tag,
    type: "authors" | "categories" | "sources"
  ) => {
    if (type === "authors") dispatch(addAuthor(tag.text));
    if (type === "categories") dispatch(addCategory(tag.text));
    if (type === "sources") dispatch(addSource(tag.id));
  };

  return (
    <div className="preferences">
      <div className="preferences-header">
        <h3 className="preferences-header__text">Customize Preferences</h3>
      </div>
      <div className="preferences-content">
        <div className="preferences-content__fields">
          <label htmlFor="authors">Type your preferred Authors first name</label>
          <ReactTags
            classNames={reactTagClassNames}
            inputFieldPosition="top"
            tags={preferences.authors.map((tag) => ({
              id: tag,
              text: tag,
              className: "tag",
            }))}
            placeholder="Press Enter to add new Authors"
            allowDeleteFromEmptyInput={false}
            handleDelete={(i) => handleDelete(i, "authors")}
            handleAddition={(tag) => handleAddition(tag, "authors")}
            minQueryLength={1}
          />
        </div>
        <div className="preferences-content__fields">
          <label htmlFor="categories">Type your preferred categories</label>
          <ReactTags
            classNames={reactTagClassNames}
            inputFieldPosition="top"
            tags={preferences.categories.map((tag) => ({
              id: tag,
              text: tag,
              className: "tag",
            }))}
            placeholder="Press Enter to add new Categories"
            handleDelete={(i) => handleDelete(i, "categories")}
            handleAddition={(tag) => handleAddition(tag, "categories")}
            minQueryLength={1}
          />
        </div>
        <div className="preferences-content__fields">
          <label htmlFor="sources">Type your preferred Sources</label>
          <ReactTags
            classNames={reactTagClassNames}
            inputFieldPosition="top"
            placeholder="Press Enter to add new Sources"
            tags={preferences.sources.map((tag) => ({
              id: tag,
              text: tag,
              className: "tag",
            }))}
            suggestions={allSources.map((source) => ({
              id: source.value,
              text: source.name,
              className: "tag",
            }))}
            handleDelete={(i) => handleDelete(i, "sources")}
            handleAddition={(tag) => handleAddition(tag, "sources")}
            minQueryLength={1}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPreference;
