// @ts-nocheck
import Collections from './variants/en/src-customization/data/collections.json'
import Inventory from './variants/en/src-customization/data/inventory.json'


export interface IProductModel {
    key: string;
    transscript?: string;
    productConfig?: IInventoryItemDefinition;
    productOptions: IProductOptions;
    selected?: boolean;
    timestampCreated: number;
}

export interface IProductOptions {
    [optionKey: string]: IProductOption
}

export interface IProductOption {
    amount: number;
    originalAmount?: number;
    radio?: boolean;
}

export interface ICollection {
    ItemDefs: IInventoryItemDefinition[],
    ProductTags: string[],
    OptionTags: string[],
}

export interface IInventoryItemDefinition {
    Image?: string
    Price?: Array<number>
    Keys: Array<string>
    Tags: Array<string>
    Options: Array<string>
}

export interface ICollectionDefinition {
    CollectionID: string;
    Constraint: string;
    ProductTags: Array<string>
    OptionTags: Array<string>
}



export const getOptionsByTags = (collection: Array<IInventoryItemDefinition>, requiredTags: Array<string>) => {
    return collection.filter(item => requiredTags.every(tag => item.Tags?.includes(tag)))
}

export function BuildConfigurationSubsets(): { [key: string]: ICollection } {
    const subsets: { [key: string]: ICollection } = {}

    const o = Collections
    o.forEach(collectionDefinition => {
        const key = collectionDefinition.CollectionID
        subsets[key] = {
            ItemDefs: getOptionsByTags(Inventory, collectionDefinition.OptionTags),
            ProductTags: collectionDefinition.ProductTags,
            OptionTags: collectionDefinition.OptionTags,
        }
    })

    return subsets
}
