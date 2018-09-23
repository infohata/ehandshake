#include "handshake.hpp"
#include <iostream>

void handshake::shakehands(const account_name from, const account_name to, const uint64_t group_id, const string subject) {
    require_auth(from);
    require_recipient(to);
    time current_time = now();
    eosio_assert(check_group(group_id, subject), "group not found or subject mismatching.");
    eosio_assert(subject.size() <= 256, "subject has to be shorter than 256 symbols");
    trusts trust_table(_self, _self);
    trust_table.emplace(_self, [&](auto &tt) {
        tt.id = trust_table.available_primary_key();
        tt.from = from;
        tt.to = to;
        tt.group_id = group_id;
        tt.signed_at = current_time;
        tt.broken_at = 0;
    });
}

void handshake::newtrustgrp(const string subject, const account_name creator, const time created_at) {
    require_auth(creator);
    eosio_assert(subject.size() <= 256, "subject has to be shorter than 256 symbols");
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

void handshake::deletetrust(const uint64_t id)
{
    trusts trust_table(_self, _self);
    auto itr = trust_table.find(id);
    eosio_assert(itr != trust_table.end(), "there is no trust group with this id");
    require_auth(itr->from);
    trust_table.erase(itr);
    eosio_assert(itr != trust_table.end(), "trust group not deleted properly");
}

bool handshake::check_group(const uint64_t group_id, const string subject) {
    trustgroups trustgroup_table(_self, _self);
    auto itr = trustgroup_table.find(group_id);
    if (itr != trustgroup_table.end()) {
        if (itr->subject != subject) {
            return false;
        }
        return true;
    }
    return false;
}

EOSIO_ABI(handshake, (shakehands)(newtrustgrp)(deletegroup)(deletetrust))
