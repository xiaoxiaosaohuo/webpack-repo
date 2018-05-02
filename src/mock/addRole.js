import { keyBy, groupBy, find, result } from "lodash";

import {parseAuth} from "../common/utils"
import setAuthTree from "../components/checkboxtree/treeUtils.js"

let oldData ={
  "msg": "执行成功",
  "traceID": "",
  "code": "000",
  "totalSize": "0",
  "data": {
    "records": [
     			{
     				"rightName": "修改企业",
     				"systemID": "1",
     				"systemName": "mis系统pc版",
     				"rightID": "5",
     				"moduleName": "特别设置",
     				"rightGroupName": "企业管理",
     				"systemKey": "mis(pc版）",
     				"moduleID": "2",
     				"rightDesc": "修改人员基本信息"
     			},
     			{
     				"rightName": "修改人员",
     				"systemID": "1",
     				"systemName": "mis系统pc版",
     				"rightID": "5",
     				"moduleName": "特别设置",
     				"rightGroupName": "人员管理",
     				"systemKey": "mis(pc版）",
     				"moduleID": "2",
     				"rightDesc": "修改人员基本信息"
     			},
     			{
     				"rightName": "修改企业",
     				"systemID": "1",
     				"systemName": "mis系统pc版",
     				"rightID": "5",
     				"moduleName": "基本设置",
     				"rightGroupName": "企业管理",
     				"systemKey": "mis(pc版）",
     				"moduleID": "1",
     				"rightDesc": "修改人员基本信息"
     			},
     			{
     				"rightName": "修改人员",
     				"systemID": "1",
     				"systemName": "mis系统pc版",
     				"rightID": "5",
     				"moduleName": "基本设置",
     				"rightGroupName": "人员管理",
     				"systemKey": "mis(pc版）",
     				"moduleID": "1",
     				"rightDesc": "修改人员基本信息"
     			},
     			{
     				"rightName": "删除人员",
     				"systemID": "2",
     				"systemName": "mis系统移动版",
     				"rightID": "7",
     				"moduleName": "基本设置",
     				"rightGroupName": "人员管理",
     				"systemKey": "mis(移动版）",
     				"moduleID": "1",
     				"rightDesc": "删除人员基本信息"
     			},
     			{
     				"rightName": "修改企业",
     				"systemID": "2",
     				"systemName": "mis系统移动版",
     				"rightID": "7",
     				"moduleName": "基本设置",
     				"rightGroupName": "企业管理",
     				"systemKey": "mis(移动版）",
     				"moduleID": "1",
     				"rightDesc": "删除人员基本信息"
     			},
     			{
     				"rightName": "删除人员",
     				"systemID": "2",
     				"systemName": "mis系统移动版",
     				"rightID": "7",
     				"moduleName": "特别设置",
     				"rightGroupName": "人员管理",
     				"systemKey": "mis(移动版）",
     				"moduleID": "2",
     				"rightDesc": "删除人员基本信息"
     			}
     		]
     	
  },
  "success": "true"
}
export let system = [];
let records = oldData.data.records;
//按system分类



parseAuth(system,records)
