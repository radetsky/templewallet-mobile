import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { DataPlaceholder } from '../../components/data-placeholder/data-placeholder';
import { Divider } from '../../components/divider/divider';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { InsetSubstitute } from '../../components/inset-substitute/inset-substitute';
import { SearchInput } from '../../components/search-input/search-input';
import { ScreensEnum } from '../../navigator/enums/screens.enum';
import { loadDAppsListActions } from '../../store/d-apps/d-apps-actions';
import { useDAppsListSelector } from '../../store/d-apps/d-apps-selectors';
import { formatSize } from '../../styles/format-size';
import { isDefined } from '../../utils/is-defined';
import { useDAppsStyles } from './d-apps.styles';
import { IntegratedDApp } from './integrated/integrated';
import { OthersDApp } from './others/others';

export const DApps = () => {
  const dispatch = useDispatch();
  useEffect(() => void dispatch(loadDAppsListActions.submit()), []);

  const styles = useDAppsStyles();

  const DAppsList = useDAppsListSelector();

  const [searchQuery, setSearchQuery] = useState<string>();

  const sortedDAppsList = useMemo(() => {
    if (isDefined(searchQuery)) {
      return DAppsList.filter(dapp => dapp.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return DAppsList;
  }, [searchQuery, DAppsList]);

  return (
    <>
      <InsetSubstitute type="top" />
      <SearchInput placeholder="Search Dapp" onChangeText={setSearchQuery} />
      <Divider size={formatSize(20)} />
      <Text style={styles.text}>Integrated</Text>
      <Divider size={formatSize(20)} />
      <View style={styles.dappBlockWrapper}>
        <IntegratedDApp
          screenName={ScreensEnum.LiquidityBakingDapp}
          iconName={IconNameEnum.LbDappIcon}
          title="Liquidity Baking"
          description="Create XTZ/tzBTC & earn XTZ"
        />
      </View>
      <Divider size={formatSize(20)} />
      <Text style={styles.text}>Others</Text>
      <Divider size={formatSize(16)} />
      {sortedDAppsList.length ? (
        <FlatList
          data={sortedDAppsList}
          renderItem={item => <OthersDApp item={item} />}
          keyExtractor={item => item.name}
          numColumns={2}
          contentContainerStyle={styles.container}
        />
      ) : (
        <DataPlaceholder text="No records found." />
      )}
    </>
  );
};
