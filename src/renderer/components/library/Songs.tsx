import * as React from 'react';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import {
    Table,
    Column,
    RowMouseEventHandlerParams,
} from 'react-virtualized/dist/commonjs/Table';
import AppStore from '../../stores/AppStore';
import { TrackModel } from '../../database/TracksDatabase';
import * as TimeUtils from '../../utilities/TimeUtils';

export interface SongsProps {
    store: AppStore;
}

export default class Songs extends React.Component<SongsProps, any> {
    constructor(props: SongsProps) {
        super(props);
    }

    rowGetter = ({ index }: { index: number }) => {
        return this.props.store.state.library[index];
    };

    noRowsRenderer = () => {
        return <div>Empty State</div>;
    };

    rowClassName = ({ index }: { index: number }) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    componentDidMount() {
        this.props.store.library.initLibrary();
    }

    onRowDoubleClick = (info: RowMouseEventHandlerParams) => {
        this.props.store.player.createPlayerQueue(info.index);
    };

    handleTableSort = ({
        sortBy,
        sortDirection,
    }: {
        sortBy: string;
        sortDirection: 'ASC' | 'DESC';
    }) => {
        this.props.store.library.sortLibrary(sortBy, sortDirection).then(() => {
            this.props.store.settings.setLibrarySort(sortBy, sortDirection);
        });
    };

    render() {
        const { store } = this.props;
        return (
            <div className="songs">
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            headerHeight={26}
                            rowGetter={this.rowGetter}
                            noRowsRenderer={this.noRowsRenderer}
                            height={height}
                            rowHeight={28}
                            rowCount={store.state.library.length}
                            rowClassName={this.rowClassName}
                            onRowDoubleClick={this.onRowDoubleClick}
                            sort={this.handleTableSort}
                            sortBy={
                                this.props.store.state.settings.library.sortBy
                            }
                            sortDirection={
                                this.props.store.state.settings.library
                                    .sortDirection
                            }
                            width={width}>
                            <Column
                                label="Name"
                                dataKey="title"
                                width={(width - 20) * (31 / 100)}
                                cellDataGetter={({
                                    rowData,
                                }: {
                                    rowData: TrackModel;
                                }) => rowData.common.title}
                            />
                            <Column
                                label="Artist"
                                dataKey="artist"
                                width={(width - 20) * (31 / 100)}
                                cellDataGetter={({
                                    rowData,
                                }: {
                                    rowData: TrackModel;
                                }) => rowData.common.artist}
                            />
                            <Column
                                label="Album"
                                dataKey="album"
                                width={(width - 20) * (31 / 100)}
                                cellDataGetter={({
                                    rowData,
                                }: {
                                    rowData: TrackModel;
                                }) => rowData.common.album}
                            />
                            <Column
                                label="Duration"
                                dataKey="duration"
                                disableSort={true}
                                width={(width - 20) * (7 / 100)}
                                cellDataGetter={({
                                    rowData,
                                }: {
                                    rowData: TrackModel;
                                }) =>
                                    TimeUtils.parseToMinutes(
                                        rowData.format.duration !== undefined
                                            ? rowData.format.duration
                                            : 0
                                    )
                                }
                            />
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );
    }
}
