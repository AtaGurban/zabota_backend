const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING,  },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  // email: {type:DataTypes.STRING, unique: true},
  phone: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  customerService: { type: DataTypes.BOOLEAN, defaultValue: false },
  customerDataBase: { type: DataTypes.BOOLEAN, defaultValue: false },
  scenarioSettings: { type: DataTypes.BOOLEAN, defaultValue: false },
  userSettings: { type: DataTypes.BOOLEAN, defaultValue: false },
  eventLog: { type: DataTypes.BOOLEAN, defaultValue: false },
  employeeEfficiency: { type: DataTypes.BOOLEAN, defaultValue: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Сoupon = sequelize.define("coupon", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.STRING },
  contacts: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
  count: { type: DataTypes.BIGINT },
  limited: { type: DataTypes.BOOLEAN },
});

const EventHistory = sequelize.define("event-history", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE },
});

const Event = sequelize.define("event", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  event: { type: DataTypes.STRING },
});

const Status = sequelize.define("status", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  status_id: { type: DataTypes.INTEGER },
  status_name: { type: DataTypes.STRING },
});

const Deal = sequelize.define("deal", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  deal_id: { type: DataTypes.INTEGER },
  price: { type: DataTypes.BIGINT },
  price_second: { type: DataTypes.INTEGER },
  status_id: { type: DataTypes.INTEGER },
  manager_id: { type: DataTypes.INTEGER },
  second_manager_id: { type: DataTypes.INTEGER },
  lawyer_id: { type: DataTypes.INTEGER },
  broker_id: { type: DataTypes.INTEGER },
  client_id: { type: DataTypes.INTEGER },
  comment: { type: DataTypes.TEXT },
  abc_status: { type: DataTypes.STRING },
  complete: { type: DataTypes.BOOLEAN },
  deleted: { type: DataTypes.BOOLEAN },
  deletedOfOurDB: { type: DataTypes.BOOLEAN, defaultValue: false },
  unvisibleUntilDate: { type: DataTypes.DATE, defaultValue: null },
});

const Manager = sequelize.define("manager", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  manager_id: { type: DataTypes.BIGINT },
  manager_name: { type: DataTypes.STRING },
  manager_phone: { type: DataTypes.STRING },
  manager_email: { type: DataTypes.STRING },
  manager_position: { type: DataTypes.STRING },
  firstRate: {type:DataTypes.FLOAT, defaultValue: 0},
  secondRate: {type:DataTypes.FLOAT, defaultValue: 0},
  thirdRate: {type:DataTypes.FLOAT, defaultValue: 0},
});

const Contact = sequelize.define("contact", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  contact_id: { type: DataTypes.BIGINT },
  contact_name: { type: DataTypes.STRING },
  contact_phone_two: { type: DataTypes.STRING },
  contact_phone: { type: DataTypes.STRING },
  contact_email: { type: DataTypes.STRING },
  contact_type: { type: DataTypes.STRING },
  birthdate: { type: DataTypes.DATE },
  manager_id: { type: DataTypes.INTEGER },
});

const Call = sequelize.define("call", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING },
  phoneCustomer: { type: DataTypes.STRING },
  phoneUser: { type: DataTypes.STRING },
  start: { type: DataTypes.DATE },
  duration: { type: DataTypes.INTEGER },
  callIdByBATC: { type: DataTypes.STRING },
  linkAudio: { type: DataTypes.STRING },
  rating: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.FLOAT, defaultValue: 0 },
  type: { type: DataTypes.STRING, defaultValue: "" },
  count: { type: DataTypes.BIGINT, defaultValue: 0 },
});

const TypeScenario = sequelize.define("type_scenario", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
});

const EndActionsScenario = sequelize.define("end_actions_scenario", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const ModuleForScenario = sequelize.define("module_for_scenario", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Scenario = sequelize.define("scenario", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  fromDate: { type: DataTypes.DATE, defaultValue: null },
  untilDate: { type: DataTypes.DATE, defaultValue: null },
  firstNew: { type: DataTypes.BOOLEAN, defaultValue: null },
  name: { type: DataTypes.STRING, allowNull: false },
  completedAction: { type: DataTypes.INTEGER, allowNull: false },
  notDoneAction: { type: DataTypes.INTEGER, allowNull: false },
  notRingUpAction: { type: DataTypes.INTEGER, allowNull: false },
});

const ModuleWithScenario = sequelize.define("module_with_scenario", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
});

const ModuleText = sequelize.define("module_text", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
});

const ModuleTextWithTitle = sequelize.define("module_text_title", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  title: { type: DataTypes.TEXT, allowNull: false },
});

const ModuleComment = sequelize.define("module_comment", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  title: { type: DataTypes.TEXT, allowNull: false },
});

const ModuleSendLink = sequelize.define("module_send_link", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
});

const ModuleCheckList = sequelize.define("module_check_list", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
});

const ModuleDropdown = sequelize.define("module_dropdown", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
});

const ModuleDropdownItems = sequelize.define("module_dropdown-items", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  item: { type: DataTypes.STRING, allowNull: false },
});

const ModuleCheckListItems = sequelize.define("module_check_list_items", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
});

const ModuleSendCoupon = sequelize.define("module_send_coupon", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
});

const ModuleRatingUser = sequelize.define("module_rating_user", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
});

const ModuleReferralSpecialist = sequelize.define("module_referral_specialist", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
});

const HistoryHappedBirtDay = sequelize.define("history-happed-birthday", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
});

const ReCallAction = sequelize.define("recall-action", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  unit: { type: DataTypes.STRING },
  count: { type: DataTypes.INTEGER },
  actionNumber: { type: DataTypes.INTEGER },
  time: { type: DataTypes.DATE },
});

const ChangeStatusAction = sequelize.define("change-status", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  // typeScenarioId: { type: DataTypes.BIGINT },
});

const DeleteAction = sequelize.define("delete", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  // typeScenarioId: { type: DataTypes.BIGINT },
});

const HistorySendCoupon = sequelize.define("history-send-coupon", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
});

const HistoryReferralToAnotherSpecialist = sequelize.define( 
  "history-referral-to-specialist",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    to: { type: DataTypes.BIGINT },
  }
);

Manager.hasMany(Rating, { as: "rating" });

User.hasMany(Deal, { as: "deal" });

TypeScenario.hasMany(Deal, { as: "deal" });

TypeScenario.hasMany(Scenario, { as: "scenario" });

Scenario.hasMany(ReCallAction, { as: "recall" });

Scenario.hasMany(ChangeStatusAction, { as: "change-status" });

Scenario.hasMany(DeleteAction, { as: "delete" });

Scenario.hasMany(ModuleText, { as: "module-text" });

Scenario.hasMany(ModuleTextWithTitle, { as: "module-text-title" });

Scenario.hasMany(ModuleComment, { as: "module-comment" });

Scenario.hasMany(ModuleSendLink, { as: "module-send-link" });

Scenario.hasMany(ModuleReferralSpecialist, { as: "module-referral-specialist" });

Scenario.hasMany(ModuleRatingUser, { as: "module-rating-user" });

Scenario.hasMany(ModuleSendCoupon, { as: "module-send-coupon" });

Scenario.hasMany(ModuleDropdown, { as: "module-dropdown" });

ModuleDropdown.hasMany(ModuleDropdownItems, { as: "module-dropdown-items" });

Scenario.hasMany(ModuleCheckList, { as: "module-check-list" });

ModuleCheckList.hasMany(ModuleCheckListItems, { as: "module-check-list-items" });

TypeScenario.hasMany(ChangeStatusAction, { as: "change-status" });
ChangeStatusAction.belongsTo(TypeScenario, { as: "type-scenario" });

Scenario.hasMany(Deal, { as: "deal" });

// EndActionsScenario.hasMany(Scenario, { as: "scenario" });
// Scenario.belongsTo(EndActionsScenario, { as: "end-actions" });

// ModuleScenario.hasMany(Scenario, { as: "scenario" }); 

User.hasMany(HistoryHappedBirtDay, { as: "birthday-history" });

User.hasMany(HistoryReferralToAnotherSpecialist, { as: "referral-history" });

User.hasMany(HistorySendCoupon, { as: "coupon-history" });

User.hasMany(EventHistory, { as: "history" });
EventHistory.belongsTo(User, { as: "user" });

Event.hasMany(EventHistory, { as: "history" });
EventHistory.belongsTo(Event, { as: "event" });

User.hasMany(Call, { as: "call" });

Contact.hasMany(EventHistory, { as: "history" });

EventHistory.belongsTo(Contact, { as: "contact" });

Contact.hasMany(Call, { as: "call" }); 

Contact.hasMany(HistoryHappedBirtDay, { as: "birthday-history" });

Contact.hasMany(HistorySendCoupon, { as: "coupon-history" });

Deal.hasMany(HistoryReferralToAnotherSpecialist, { as: "referral-history" });

ModuleForScenario.belongsToMany(Scenario, {
  through: ModuleWithScenario,
  as: "scenario",
});
Scenario.belongsToMany(ModuleForScenario, {
  through: ModuleWithScenario,
  as: "module",
});

module.exports = {
  User,
  Сoupon,
  Call,
  EndActionsScenario,
  HistorySendCoupon,
  ModuleForScenario,
  HistoryReferralToAnotherSpecialist,
  Event,
  ModuleTextWithTitle,
  ModuleSendLink,
  DeleteAction,
  ModuleDropdown,
  ModuleDropdownItems,
  ModuleCheckList,
  ModuleCheckListItems,
  ModuleReferralSpecialist,
  ModuleRatingUser,
  ModuleSendCoupon,
  EventHistory,
  ReCallAction,
  ModuleWithScenario,
  Status,
  Manager,
  Contact,
  ModuleComment,
  Scenario,
  ChangeStatus: ChangeStatusAction,
  Deal,
  ModuleText,
  TypeScenario,
  Rating,
  HistoryHappedBirtDay,
};
