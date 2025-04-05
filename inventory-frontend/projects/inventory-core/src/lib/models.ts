import { FormGroup } from "@angular/forms";

export class Menu {
    tagId!: string;
    name!: string;
    path!: string;
    icon?: string;
    show!: boolean;
    children?: Menu[];
    constructor(name: string, path: string, icon?: string, children?: Menu[]) {
        this.icon = icon;
        this.name = name;
        this.path = path;
        this.children = children;
        // 
        this.show = true;
        this.tagId = "menu-" + path.split("/").join("_")
    }
}

export function hasValues(value: any) {
    return (value != null && value != undefined && value != "" && value != "undefined" && value != "null")
}

export interface DropDown<T = any> {
    Id: number | any;
    Des: string;
    Display?: string;
    RowData?: T;
}

export interface BasicWhereCondition {
    fieldName: string,
    isJsonField?: boolean;
    jsonFieldName?: string;
    operator: QBOperator
    value: any,
    applyLowerCase?: boolean
}

export interface TableInterceptorEvents<T> {
    beforeInsert?: (item: T) => ({ [index: string]: any }),
    afterInsert?: (item: T) => void,
    beforeUpdate?: (item: T) => ({ [index: string]: any }),
    afterUpdate?: (item: T) => void,
    beforeDelete?: (id: string) => void,
    afterDelete?: (item: T) => void
    onSingleGet?: (item: T) => ({ [index: string]: any }),
}

export interface RestApiResponse<T = any> {
    status: REST_API_RESPONSE_STATUS
    data: T,
    total?: number
    message?: string
}

export enum DEVICE {
    DESKTOP = 'desktop',
    MOBILE = 'mobile',
    TABLET = 'tablet'
}

export type QBOperator =
    "EQUAL" |
    "NOT_EQUAL" |
    "IN" |
    "IS_NULL" |
    "CONTAINS" |
    "BETWEEN" |
    "LESS_THEN" |
    "LESS_THEN_EQUAL" |
    "GREATER_THEN" |
    "GREATER_THEN_EQUAL"
export interface DropDown<T = any> {
    Id: number | any;
    Des: string;
    Display?: string;
    RowData?: T;
}

export interface BasicWhereCondition {
    fieldName: string,
    isJsonField?: boolean;
    jsonFieldName?: string;
    operator: QBOperator
    value: any,
    applyLowerCase?: boolean
}

export interface TableInterceptorEvents<T> {
    beforeInsert?: (item: T) => ({ [index: string]: any }),
    afterInsert?: (item: T) => void,
    beforeUpdate?: (item: T) => ({ [index: string]: any }),
    afterUpdate?: (item: T) => void,
    beforeDelete?: (id: string) => void,
    afterDelete?: (item: T) => void
    onSingleGet?: (item: T) => ({ [index: string]: any }),
}

export interface RestApiResponse<T = any> {
    status: REST_API_RESPONSE_STATUS
    data: T,
    total?: number
    message?: string
}

export enum REST_API_RESPONSE_STATUS {
    SUCCESS, FAILED
}

export interface AboutSujithUserInfo {
    name: string,
    brandName: string,
    overAllRole: string,
    email: string,
    phone: string,
    location: string,
    locationUrl: string,
    aboutHeader: string,
    experienceSummary: { description: string }[],
    ignoreMailBox: boolean,
    linkedInProfile: string,
    experience: {
        linedInUrl?: string,
        imageUrl: string,
        company: string,
        role: string,
        Duration: string,
        startYear: number,
        startMonth: number,
        endYear?: number,
        endMonth?: number,
        present?: boolean
    }[]
    education: { title: string, description: string }[],
    works: { projectName: string, client: string, tools: string, details: any }[],
    skills: { title: string, tech: string[] }[]
}


export class QueryParameters {
    pageSize: number = 10
    pageIndex: number = 1
    sortField: string = 'id'
    sortOrder: "ascend" | "descend" = 'descend';
    filter!: string
}

export class DataQuery {
    pageIndex: number = 1
    pageSize: number = 10
    sortField: string = 'id'
    sortOrder: "ascend" | "descend" = 'descend'
    filter: {
        key: string,
        condition: QBOperator,
        value: string,
        value2?: string
    }[] = []

    addFilters(info: {
        key: string,
        condition: QBOperator,
        value: string,
        value2?: string
    }) {
        let existValue = this.filter.find(x => x.key === info.key) as any
        if (hasValues(existValue)) {
            if (existValue.condition != info.condition || existValue.value != info.value || existValue.value2 != info.value2)
                this.filter.push({ key: info.key, condition: info.condition, value: info.value, value2: info.value2 })
        } else this.filter.push({ key: info.key, condition: info.condition, value: info.value, value2: info.value2 })
    }

    getQueryUrl(extraQueryParameter: string[] = []) {
        const q: string[] = [];
        q.push('pageIndex=' + this.pageIndex)
        q.push('pageSize=' + this.pageSize)

        q.push('sortField=' + this.sortField)
        q.push('sortOrder=' + this.sortOrder)

        if (this.filter && this.filter.length > 0) {
            const filterQuery: string[] = []
            for (const fil of this.filter) {
                filterQuery.push(`${fil.key}||${fil.condition}||${fil.value}${fil.value2 ? '||' + fil.value2 : ''}`)
            }
            q.push("filter=" + (filterQuery.join(";")))
        }
        return "?" + [...extraQueryParameter, ...q].join("&")
    }
}

export class ApiData<T> {
    constructor(public data: T, public totalCount?: number) { }
}


export interface IEnvironment {
    production: boolean,
    apiEndPointUrl: string,
    fileManagerApiURL: string,
    fileManagerRootPath: string,
    adminApp: boolean
}

export class CoreGridColumn<T = any> {
    constructor(info: CoreGridColumn) {
        Object.keys(info).forEach(x => {
            (this as any)[x] = (info as any)[x]
        })
    }
    name!: string
    displayName!: string
    dataType!: DATA_TYPE
    link?: boolean = false
    isImage?: boolean = false
    isEnum?: boolean = false
    onClick?: (row: T) => void
    style?: (row: T) => ({ [index: string]: string | number })
    hidden?: boolean
    width?: number = 150
    enumDropDown?: DropDown[]
    hideFromFilter?: boolean = false
}

export class CoreGridTopIconAction {
    icon!: string;
    callBack!: () => void;
    toolTip!: string;
    isButton?: boolean
    display?: string
    hidden?: boolean
    enumDropDown?: any
}

export class CoreGridRowIconAction<T = any> {
    icon!: string;
    callBack!: (row: T) => void;
    name!: string;
    disable?: (row: T) => boolean
}


export interface IImage {
    url: string,
    type: string
    error: string
    iconType: string
    isImageUrl: string
    isUploading: string
    lastModified: number
    lastModifiedDate: number
    linkProps: string
    message: string
    name: string
    originFileObj: File
    percent: number
    response: { fileName: string }
    showDownload: boolean
    size: number
    status: string
    thumbUrl: string
    uid: string
}

export enum DATA_TYPE {
    NUMBER = "NUMBER",
    BIG_NUMBER = "BIG_NUMBER",
    DECIMAL_NUMBER = "DECIMAL_NUMBER",
    STRING = "STRING",
    TIME = "TIME",
    DATE = "DATE",
    DATETIME = "DATETIME",
    BOOLEAN = "BOOLEAN",
    OBJECT = "OBJECT",
    ARRAY = "ARRAY"
}



export function enumToNormalWord(input: any) {
    if (!hasValues(input)) return input;
    input = input.toLowerCase();
    let description = input.split("_").map((xx: any) => xx == "OR" ? "/" : titleCase(xx)).reduce((xx: any, yy: any) => xx + " " + yy)
    description = description.replace(" / ", "/")
    return description;
}

export function markAsDirty(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
        if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
        }
    });
}


export function copyObject<t = any>(copyValue: t): t {
    return JSON.parse(JSON.stringify(copyValue));
}



export function MakeEnum(type: any): DropDown[] {
    if (type && Object.keys(type).length > 0) {
        Object.keys(type).forEach(x => {
            if (!isNaN(Number(x))) {
                delete type[x]
            }
        })

        return Object.keys(type).map(x => {
            let description = x.split("_").map(xx => xx == "OR" ? "/" : titleCase(xx)).reduce((xx, yy) => xx + " " + yy)
            description = description.replace(" / ", "/")
            return {
                Id: type[x],
                Des: description
            }
        })
    } else return []
}


export function titleCase(value: string) {
    if (typeof value != 'string' || !value) return "";
    return value.split('_').map(x => {
        if (typeof x[0] == 'string')
            return x[0].toUpperCase() + (x.substr(1) ? x.substr(1).toLowerCase() : "")
        else return ""
    }).join(" ");
}



export function encode(str: string): string {
    return btoa(encodeURIComponent(str))
}

export function decode(str: string): string {
    return decodeURIComponent(atob(str));
}


export function removeAllSpacialCharacters(input: string, replaceValue: any) {
    return input.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/g, replaceValue)
}

export const nameOf = <T>(name: keyof T) => name;



export function buildQueryUrlWithObject(info: { [index: string]: any }) {
    return Object.keys(info).filter(x => hasValues(info[x])).length > 0 ? "?" + (Object.keys(info).filter(x => hasValues(info[x])).map(x => `${x}=${info[x]}`).join("&")) : ""
}


export function nameClassCase(str: string) {
    const words = String(str).split(/(?=[A-Z])/);
    const className = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    return className;
}

export function nameCamelCase(str: string) {
    str = String(str).replace(/^_+/, '');
    return str.charAt(0).toLowerCase() + str.slice(1);
}