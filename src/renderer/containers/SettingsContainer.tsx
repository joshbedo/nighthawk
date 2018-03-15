import * as React from 'react';
import { TabBar } from '../components/elements/TabBar';
import Library from '../components/settings/Library';

enum TabItemsOrder {
    Library,
    System,
}

export interface SettingsContainerProps {}

interface SettingsContainerState {
    activeTabIndex: TabItemsOrder;
}

export default class SettingsContainer extends React.Component<
    SettingsContainerProps,
    SettingsContainerState
> {
    constructor(props: SettingsContainerProps) {
        super(props);

        this.state = {
            activeTabIndex: TabItemsOrder.Library,
        };
    }

    handleTabClick = (index: number) => {
        this.setState({ activeTabIndex: index });
    };

    renderActiveTabItem() {
        switch (this.state.activeTabIndex) {
            case TabItemsOrder.Library: {
                return <Library />;
            }

            case TabItemsOrder.System: {
                return <div />;
            }
        }
    }

    render() {
        return (
            <>
                <TabBar onTabClicked={this.handleTabClick}>
                    <span>Library</span>
                    <span>System</span>
                </TabBar>
                {this.renderActiveTabItem()}
            </>
        );
    }
}
