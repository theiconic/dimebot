import { RegExpMatch } from '../../../common/RegExpMatch';

const regex = /(add|remove|show|help) whitelist(\s?<#([A-Z0-9]+)\|(.*)>)?/gim;

export const regExpMatch = new RegExpMatch(regex);
export const regExp = new RegExp(regex);
