import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Repository } from 'typeorm';
import { Whitelist } from '../../entity/Whitelist';

@EntityRepository(Whitelist)
export class WhitelistRepository extends Repository<Whitelist> {
}
