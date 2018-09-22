#include "handshake.hpp"

void handshake::shakehands(const account_name from, const account_name to, const uint64_t group_id, const string subject) {
    require_auth(from);
    require_recipient(to);
    
}

void handshake::newtrustgrp(const string subject, const account_name creator, const time created_at) {
    require_auth(creator);
    // TODO: asserts for creator and created_at;
    trustgroups trustgroup_table(_self, _self);
    trustgroup_table.emplace(_self, [&](auto &tgt) {
        tgt.id = trustgroup_table.available_primary_key();
        tgt.subject = subject;
        tgt.creator = creator;
        tgt.created_at = created_at;
    });
}

void handshake::deletegroup(const uint64_t id)
{
    trustgroups trustgroup_table(_self, _self);
    auto itr = trustgroup_table.find(id);
    eosio_assert(itr != trustgroup_table.end(), "there is no trust group with this id");
    require_auth(itr->creator);
    trustgroup_table.erase(itr);
    eosio_assert(itr != trustgroup_table.end(), "trust group not deleted properly");
}

bool handshake::check_group(const uint64_t group_id, const string subject) {
    trustgroups trustgroup_table(_self, _self);
    auto itr = trustgroup_table.find(group_id);
    if (itr != trustgroup_table.end()) {
        return true;
    }
    return false;
}

EOSIO_ABI(handshake, (shakehands)(newtrustgrp)(deletegroup))
