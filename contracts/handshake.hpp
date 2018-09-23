#pragma once

#include <eosiolib/eosio.hpp>
#include <eosiolib/types.hpp>
#include <eosiolib/asset.hpp>

#include <string>

using std::string;
using namespace eosio;

class handshake : public contract {
    public:
        handshake(account_name self) : contract(self) {}

        /// @abi action 
        void shakehands(const account_name from, const account_name to, const uint64_t group_id, const string subject);
        
        /// @abi action 
        void newtrustgrp(const string subject, const account_name creator, const time created_at);

        /// @abi action
        void deletegroup(const uint64_t id);

    private:
        
        /// @abi table trustgroup i64
        struct trustgroup
        {
            uint64_t id;
            string subject;
            account_name creator;
            time created_at;

            uint64_t primary_key() const { return id; }
            account_name get_creator() const { return creator; }

            EOSLIB_SERIALIZE(trustgroup, (id)(subject)(creator)(created_at))
        };

        typedef eosio::multi_index<N(trustgroup), trustgroup,
            indexed_by<N(creator), const_mem_fun<trustgroup, uint64_t, &trustgroup::get_creator>>> trustgroups;
        
        /// @abi table trust i64
        struct trust
        {
            uint64_t id;
            account_name to;
            account_name from;
            uint64_t group_id;
            time signed_at;
            time broken_at;

            uint64_t primary_key() const { return id; }
            account_name get_to() const { return to; }
            account_name get_from() const { return from; }

            EOSLIB_SERIALIZE(trust, (id)(to)(from)(group_id)(signed_at)(broken_at))
        };

        typedef eosio::multi_index<N(trust), trust,
                indexed_by<N(to), const_mem_fun<trust, uint64_t, &trust::get_to>>,
                indexed_by<N(from), const_mem_fun<trust, uint64_t, &trust::get_from>>> 
            trusts;

        bool check_group(const uint64_t group_id, const string subject);

}; //class handshake.
