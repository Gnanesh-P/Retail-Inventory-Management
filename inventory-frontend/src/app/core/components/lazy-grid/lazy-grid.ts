import { DataQuery, CoreGridColumn, CoreGridTopIconAction, CoreGridRowIconAction, hasValues, DATA_TYPE, QBOperator } from "projects/inventory-core/src/lib/models";
import { BehaviorSubject, debounceTime, Subject } from "rxjs"

export class CoreLazyGridInstance<T = any> {
    onDataSet: BehaviorSubject<{ total: number, data: T[] }> = new BehaviorSubject({ recordCount: 0, data: [] }) as any
    onQueryChange: BehaviorSubject<DataQuery> = new BehaviorSubject(new DataQuery()) as any

    constructor(info: {
        title?: string,
        columns: CoreGridColumn[],
        checkBox: boolean,
        topIconAction?: CoreGridTopIconAction[],
        rowIconAction?: CoreGridRowIconAction[],
        enableClientFilter?: boolean,
        hidePagination?: boolean,
        defaultSearchColumn?: string
    }) {
        this.columns = info?.columns || [];
        this.title = info?.title || "";
        this.checkBox = hasValues(info.checkBox) ? info?.checkBox : false;
        if (info.topIconAction) this.topIconAction = info.topIconAction
        if (info.rowIconAction) this.rowIconAction = info.rowIconAction
        this.enableClientFilter = hasValues(info.enableClientFilter) ? info.enableClientFilter : false
        this.hidePagination = !!info.hidePagination;

        this.$InputChange.pipe(debounceTime(1000)).subscribe(() => this.onFilterChange())
        if (info.defaultSearchColumn) {
            this.defaultSearchColumn = info.defaultSearchColumn
            this.filterSelectedField = info.defaultSearchColumn;
            this.filterSelectedFieldDataType = this.columns.filter(x => !x.hideFromFilter).find(x => x.name == info.defaultSearchColumn).dataType
        } else {
            this.defaultSearchColumn = this.columns.filter(x => !x.hideFromFilter)[0].name;
            this.filterSelectedField = this.columns.filter(x => !x.hideFromFilter)[0].name;
            this.filterSelectedFieldDataType = this.columns.filter(x => !x.hideFromFilter)[0].dataType
        }
    }

    total: number = 0
    title: string = ""
    loading: boolean = false;
    checkBox: boolean = true;
    enableClientFilter: boolean = false;
    clientFilter: { [index: string]: any } = {}
    data: T[] = []
    columns: CoreGridColumn[] = []
    hidePagination: boolean = false;
    private hasInitialData = false;
    setColumn(column: CoreGridColumn[]) {
        this.columns = column;
    }

    setData(info: { total: number, data: T[] }) {
        this.hasInitialData = true;
        this.selectedRow = []
        if (info && info.data && hasValues(info.data)) {
            this.data = info.data.map((x, i) => ({ ...x, $selected: false, index: i + 1 }));
            this.total = info.total
        }

        else this.data = []
        this.onDataSet.next(info);
    }

    selectedRow: T[] = []
    dataQuery = new DataQuery();
    onPageChange(page: any) {
        this.dataQuery.pageSize = page.pageSize;
        this.dataQuery.pageIndex = page.pageIndex;
    }

    topIconAction: CoreGridTopIconAction[] = []
    rowIconAction: CoreGridRowIconAction[] = []

    DATA_TYPE = DATA_TYPE

    startLoading() { this.loading = true }
    stopLoading() { this.loading = false }

    onPaginationChange(event: any) {
        this.dataQuery.pageIndex = event.pageIndex
        this.dataQuery.pageSize = event.pageSize

        let sort = event.sort.find((x: any) => x.value)
        if (hasValues(sort)) {
            this.dataQuery.sortField = sort.key
            this.dataQuery.sortOrder = sort.value;
        }
        else {
            this.dataQuery.sortField = 'id'
            this.dataQuery.sortOrder = 'descend'
        }
        if (this.hasInitialData)
            this.onQueryChange.next(this.dataQuery);
    }

    onListViewPageIndexChange(event: number) {
        this.onPaginationChange({
            filter: [],
            pageIndex: event,
            pageSize: this.dataQuery.pageSize,
            sort: []
        })
    }

    onListViewPageSizeChange(event: number) {
        this.onPaginationChange({
            filter: [],
            pageIndex: this.dataQuery.pageIndex,
            pageSize: event,
            sort: []
        })
    }

    viewIcon = 'list'
    enableListView = false;
    viewToolTip = "Enable Card List View"
    toggleView() {
        this.enableListView = !this.enableListView;
        this.viewIcon = this.enableListView ? "table" : "list"
        this.viewToolTip = this.enableListView ? "Enable Table View" : "Enable Card List View"
        if (this.hasInitialData)
            this.onQueryChange.next(this.dataQuery);
    }
    defaultSearchColumn: string = null;
    filterSelectedField: string = "";
    filterSelectedFieldDataType: DATA_TYPE = null;
    filterSelectedValue: string = "";
    onFilterAdded() {
        this.filterSelectedFieldDataType = this.columns.find(x => x.name == this.filterSelectedField)?.dataType || DATA_TYPE.STRING
        this.filterSelectedValue = null;
    }

    $InputChange = new Subject()
    onFilterChange() {
        if (!this.hasInitialData) return;

        this.dataQuery.filter = [];
        if (hasValues(this.filterSelectedField) && hasValues(this.filterSelectedValue) && hasValues(this.filterSelectedFieldDataType)) {
            let condition: QBOperator = 'CONTAINS'
            if (this.filterSelectedFieldDataType == DATA_TYPE.BOOLEAN)
                condition = 'EQUAL';
            this.dataQuery.filter.push({ key: this.filterSelectedField, condition: condition, value: this.filterSelectedValue })
        }
        this.onQueryChange.next(this.dataQuery);
    }

    onClear() {
        this.dataQuery.filter = [];
        this.filterSelectedField = this.defaultSearchColumn;
        this.filterSelectedFieldDataType = this.columns.filter(x => !x.hideFromFilter).find(x => x.name == this.filterSelectedField)?.dataType || DATA_TYPE.STRING
        this.filterSelectedValue = null;
        this.onQueryChange.next(this.dataQuery);
    }
    rightClickSelectedRow: T;
    selectedRowIndex: number = null


    rowData(row: T, colName: string) {
        if (!colName.includes(".")) return row[colName];
        else return row[colName.split(".")[0]][colName.split(".")[1]]
    }
}
